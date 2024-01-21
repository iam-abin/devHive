import { Server, Socket } from "socket.io";
import http from "http";
import { Server as SocketIo } from "socket.io";
import { BadRequestError } from "@abijobportal/common";
import userRepository from "../repositories/mongo/user.repository";
import messageRepository from "../repositories/mongo/message.repository";

interface activeUsersType {
	userId: string;
	socketId: string;
}

let activeUsers: activeUsersType[] = [];

const addUser = (userId: string, socketId: string) => {
	!activeUsers.some((user) => user.userId === userId) &&
		activeUsers.push({ userId, socketId });
};

const getUser = (userId: string) => {
	return activeUsers.find((user) => user.userId === userId);
};

const removeUser = (socketId: string) => {
	activeUsers = activeUsers.filter((user) => user.socketId !== socketId);
};

export const setupSocketIO = (httpServer: http.Server) => {
	console.log("------------------------");
	console.log("inside socket config");

	const io = new Server(httpServer, {
		path: "/api/v1/chat",
		cors: {
			origin: "*",
			allowedHeaders: ["Authentication"],
			credentials: true,
			methods: ["GET", "POST"],
		},
	});

	io.on("connection", (socket: any) => {
		// io.on("connection", (socket: Socket) => {
		console.log("io.on connection ",socket.id);
		
		onSocketConnection(io, socket);
	});
};

export const onSocketConnection = (io: Server, socket: Socket) => {
	console.log("||||||a user connected to socket... ", socket.id, " ||||||");

	// adding a user to active list
	socket.on("addAUser", (userId: string) => {
		console.log(userId, "new user added to active list");
		addUser(userId, socket.id);
		io.emit("getActiveUsers", activeUsers);
	});

	// send and get message
	socket.on("sendMessage", async (data: any) => {
		console.log('Message received');
		try {
			const { sender, recipient, text } = data;
		if (!text) throw new BadRequestError("please provide message");

		const senderData = await userRepository.findUserById(sender);
		const recipientData = await userRepository.findUserById(recipient);

		if (!senderData) throw new BadRequestError("sender is not in user db");
		if (!recipientData)
			throw new BadRequestError("recipient is not in user db");

			const result = await messageRepository.createMessage({sender, recipient, text});

			const user1 = getUser(sender);
            const user2 = getUser(recipient);

			const message = { result, currentUserId: sender, participantId: recipient };
            
            if (user1?.socketId) {
                io.to(user1.socketId).emit('receiveMessage', message);
            }

            if (user2?.socketId) {
                io.to(user2.socketId).emit('receiveMessage', message);
            }
		} catch (error) {
			console.error('Error processing message:', error);
		}

	});
	console.log("------------------------");

	// when a user disconnect
	socket.on("disconnect", () => {
		console.log("a user disconnected");
		removeUser(socket.id);
		io.emit("getActiveUsers", activeUsers);
	});
};
