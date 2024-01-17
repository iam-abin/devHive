import { Server, Socket } from "socket.io";
import http from "http";
import { Server as SockerIo } from "socket.io";
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

export const setupSocketIO = (Server: http.Server) => {
	const io = new SockerIo(Server, {
		// pingTimeout:60000,
		cors: {
			// origin: 'https://devhive.dev/api/v1/chat',
			origin: "*",
			methods: ["GET", "POST"],
		},
	});

	io.on("connection", (socket: Socket) => {
		onSocketConnection(io, socket);
	});
};

export const onSocketConnection = (io: Server, socket: Socket) => {
	console.log("a user connected to socket...");

	// adding a user to active list
	socket.on("addAUser", (userId: string) => {
		console.log(userId, "new user added to active list");
		addUser(userId, socket.id);
		io.emit("getActiveUsers", activeUsers);
	});

	// send and get message
	socket.on("sendMessage", async (data: any) => {
		const { sender, recipient, text } = data;
		if (!text) throw new BadRequestError("please provide message");

		const senderData = await userRepository.findUserById(sender);
		const recipientData = await userRepository.findUserById(recipient);

		if (!senderData) throw new BadRequestError("sender is not in out db");
		if (!recipientData) throw new BadRequestError("recipient is not in out db");


	});

	// when a user disconnect
	socket.on("disconnect", () => {
		console.log("a user disconnected");
		removeUser(socket.id);
		io.emit("getActiveUsers", activeUsers);
	});
};
