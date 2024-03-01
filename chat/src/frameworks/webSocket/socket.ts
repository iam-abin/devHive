import { Server, Socket } from "socket.io";
import http from "http";
import { Server as SocketIo } from "socket.io";
import { BadRequestError } from "@abijobportal/common";
import userRepository from "../repositories/mongo/user.repository";
import messageRepository from "../repositories/mongo/message.repository";
import chatRoomRepository from "../repositories/mongo/chatRoom.repository";
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
	console.log("inside socket config ------------------------");

	const io = new Server(httpServer, {
		path: "/api/v1/chat/socket.io",
		cors: {
			origin: "*",
			allowedHeaders: ["Authentication"],
			credentials: true,
			methods: ["GET", "POST"],
		},
	});

	io.on("connection", (socket: Socket) => {
		onSocketConnection(io, socket);
	});
};

export const onSocketConnection = (io: Server, socket: Socket) => {
	console.log(
		`|||||| New user connected ,socket id is: ${socket.id}...|||||| `
	);

	// to get or create the rooms of user
	socket.on(
		"createChatRoom",
		async (senderId: string, recepientId: string) => {
			
			try {
				const senderData = await userRepository.findUserById(senderId);
				console.log("recepientId ",recepientId);
				
				const recipientData = await userRepository.findUserById(
					recepientId
				);

				if (!senderData)
					throw new BadRequestError("sender is not in user db");
				if (!recipientData)
					throw new BadRequestError("recipient is not in user db");

				console.log("before checking room");

				const room = await chatRoomRepository.getAChatRoom(
					senderId,
					recepientId
				);
				if (room.length === 0) {
					// no room so creating room
					await chatRoomRepository.createChatRoom(
						senderId,
						recepientId
					);
				}

				if (room.length > 0) {
					console.log(room);
					console.log("room already there");
				}

				const user: any = getUser(senderId);
				const allChatRooms =
					await chatRoomRepository.getAllChatRoomsByUserId(senderId);
				io.to(user.socketId).emit("getAllChatRooms", allChatRooms);
			} catch (error) {
				console.error("Error processing message:", error);
			}
		}
	);

	// adding a user to active list
	socket.on("addActiveUser", (userId: string) => {
		console.log(userId, "new user added to active list");
		addUser(userId, socket.id);
		io.emit("getActiveUsers", activeUsers);
	});

	// send and get message
	socket.on("sendMessage", async (data: any) => {
		console.log("Message received---->", data);

		try {
			const { senderId, roomId, textMessage } = data;
			console.log("/////",data,"///////");
			
			console.log("senderId", senderId);
			console.log("roomId", roomId);
			console.log("textMessage", textMessage);

			if (!textMessage)
				throw new BadRequestError("please provide message");

			// 	console.log("----senderId ", senderId);
			
			// console.log("----recepientId ", recepientId);
			const senderData = await userRepository.findUserById(senderId);

			if (!senderData)
				throw new BadRequestError("sender is not in user db");

			const room = await chatRoomRepository.getAChatRoomById(roomId);
			if (room) {
				console.log(room);

				console.log("room already there");
			}

			const result = await messageRepository.createMessage({
				senderId,
				roomId,
				textMessage,
			});

			const user1: any = getUser(senderId);

			const recipient: any = room?.users.filter(
				(user) => user.toString() !== senderId
			);
			
			const recipientData = await userRepository.findUserById(
				recipient[0].toString()
			);
			if (!recipientData)
				throw new BadRequestError("recipient is not in user db");
			console.log("recepeint from room ", recipient);

			const user2: any = getUser(recipient[0].toString());
			

			const message = {
				result,
				senderId: senderId,
				recipient: recipient.toString(),
			};

			console.log("after recepeint from room ", message);


			if (user1?.socketId) {
				console.log("inside user1 emit user1?.socketId", user1?.socketId);
				console.log("inside user1 emit receiveMessage", message.result);
				
				io.to(user1.socketId).emit("receiveMessage", message);
			}

			if (user2?.socketId) {
				console.log("inside user2 emit receiveMessage");

				io.to(user2.socketId).emit("receiveMessage", message);
			}
		} catch (error) {
			console.error("Error processing message:", error);
		}
	});

	socket.on('markAsRead', async (messageId: string) => {
		console.log("in socket read messageId ", messageId);

		const result = await messageRepository.setReadMessage(messageId);
		// await Message.updateOne({ _id: messageId }, { read: true });
		console.log("in socket read result ", result);
		
		io.emit('messageRead', messageId);
	 });

	// when a user disconnect
	socket.on("disconnect", () => {
		console.log("a user disconnected");
		removeUser(socket.id);
		io.emit("getActiveUsers", activeUsers);
	});
};
