import { Server, Socket } from "socket.io";
import http from "http";
// import { Server as SocketIo } from "socket.io";
import { BadRequestError } from "@abijobportal/common";
import userRepository from "../repositories/mongo/user.repository";
import messageRepository from "../repositories/mongo/message.repository";
import chatRoomRepository from "../repositories/mongo/chatRoom.repository";
import { User } from "../../entities/users";
import { ChatRoom } from "../../entities/chat-room";
import notificationRepository from "../repositories/mongo/notifications.repository";

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
				console.log("recepientId ", recepientId);

				const recipientData = await userRepository.findUserById(
					recepientId
				);

				if (!senderData)
					throw new BadRequestError("sender is not in user db");
				if (!recipientData)
					throw new BadRequestError("recipient is not in user db");

				console.log("before checking room");
				// // ==================================================

				// // to solve a bug that if there is no chatrooms found then creating chatroom with current user as users in the array
				// if(senderId === recepientId) return 

				// // ==================================================

				const room = await chatRoomRepository.getAChatRoom(
					senderId,
					recepientId
				);
				console.log("getAchatroom room", room);

				if (room.length === 0 && senderId !== recepientId) {
					// no room so creating room
					let chatRoomData = {
						users: [senderId, recepientId],
					};
					const chatRoom = new ChatRoom(chatRoomData);
					console.log("chatRoom after entity in socket");

					await chatRoomRepository.createChatRoom(chatRoom);
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
			console.log("senderIddddd", senderId);
			console.log("roomIddddddd", roomId);
			console.log("textMessageeeee", textMessage);

			if (!textMessage)
				throw new BadRequestError("please provide message");

			const senderData = await userRepository.findUserById(senderId);

			if (!senderData)
				throw new BadRequestError("sender is not in user db");

			const room = await chatRoomRepository.getAChatRoomById(roomId);

			if (room) {
				console.log("room already thereeeee ", room);
			}

			const result = await messageRepository.createMessage({
				senderId,
				roomId,
				textMessage,
			});

			console.log("before chatroom repo)))))))))))");

			let chatroomResult = await chatRoomRepository.updateAChatRoom(
				roomId,
				textMessage
			);
			console.log(
				"after chatroom repo))))))))))) chatroomResult",
				chatroomResult
			);

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


			const notification = await notificationRepository.createNotification({	
				senderId,
				targetUserId: recipient.toString(),
				message: textMessage,
			})


			// ================================

			// it is working when the recepient is not online or active
			// if(!user2){

			// 	const user: any = getUser(senderId);
			// 	const allChatRooms = await chatRoomRepository.getAllChatRoomsByUserId(senderId);
	
			// 	io.to(user.socketId).emit("chatNotification", allChatRooms);
			// }


			// ================================

			console.log("after recepeint from room ", message);

			if (user1?.socketId) {
				console.log(
					"inside user1 emit user1?.socketId",
					user1?.socketId
				);
				console.log("inside user1 emit receiveMessage", message.result);

				io.to(user1.socketId).emit("receiveMessage", message);
			}

			if (user2?.socketId) {
				console.log("inside user2 emit receiveMessage");

				io.to(user2.socketId).emit("receiveMessage", message);
				io.to(user2.socketId).emit("chatNotification", notification);
			}
		} catch (error) {
			console.error("Error processing message:", error);
		}
	});

	socket.on("markAsRead", async (messageId: string) => {
		console.log("---------------in socket read messageId ", messageId);

		const result = await messageRepository.setReadMessage(messageId);
		// await Message.updateOne({ _id: messageId }, { read: true });
		console.log("in socket read result ", result);

		io.emit("messageRead", messageId);
	});

	// when a user disconnect
	socket.on("disconnect", () => {
		console.log("a user disconnected!!!");
		removeUser(socket.id);
		io.emit("getActiveUsers", activeUsers);
	});
};
