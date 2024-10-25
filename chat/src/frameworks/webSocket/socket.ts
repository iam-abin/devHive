import { Server, Socket } from "socket.io";
import http from "http";

import { BadRequestError, NotFoundError } from "@abijobportal/common";
import userRepository from "../repositories/mongo/user.repository";
import messageRepository from "../repositories/mongo/message.repository";
import chatRoomRepository from "../repositories/mongo/chatRoom.repository";
import { ChatRoom } from "../../entities/chat-room";
import notificationRepository from "../repositories/mongo/notifications.repository";
import { IChatRoomDocument } from "../database/mongo/models/chatRoom";
import { IUserDocument } from "../database/mongo/models/user";
import { IMessage } from "../types/message";
import { IMessageDocument } from "../database/mongo/models/message";
import { INotificationDocument } from "../database/mongo/models/notification";

type activeUser = {
    userId: string;
    socketId: string;
};

let activeUsers: activeUser[] = [];

const addUserToOnline = (userId: string, socketId: string): void => {
    const isActiveUser = activeUsers.some((user) => user.userId === userId);
    if (!isActiveUser) activeUsers.push({ userId, socketId });
};

const getOnlineUser = (userId: string): activeUser | undefined => {
    const activeUser = activeUsers.find((user) => user.userId === userId);
    return activeUser;
};

const removeUserFromOnline = (socketId: string): void => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socketId);
};

const getRecepient = (
    currentUserId: string,
    room: IChatRoomDocument
): string => {
    const recipient = room.users.find(
        (userId) => userId.toString() !== currentUserId
    );
    if (!recipient) throw new NotFoundError("Recipient not found");
    return recipient.toString();
};

export const setupSocketIO = (httpServer: http.Server): void => {
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

export const onSocketConnection = (io: Server, socket: Socket): void => {
    console.log(`||| A New user connected ,socket id is: ${socket.id} ||| `);

    // to get or create the rooms of user
    socket.on(
        "createChatRoom",
        async (senderId: string, recepientId: string) => {
            try {
                console.log("In createChatRoom event");

                if (!senderId)
                    throw new BadRequestError("senderId should provide");
                if (!recepientId)
                    throw new BadRequestError("recepientId should provide");

                const sender: IUserDocument | null =
                    await userRepository.getById(senderId);
                if (!sender) throw new NotFoundError("sender not found");

                const recipient: IUserDocument | null =
                    await userRepository.getById(recepientId);
                if (!recipient) throw new NotFoundError("recipient not found");

                const room: IChatRoomDocument | null =
                    await chatRoomRepository.getAChatRoom(
                        senderId,
                        recepientId
                    );

                // Create a chatroom If there is no chat room for the two users
                if (!room) {
                    if (senderId !== recepientId) {
                        // no room so creating room
                        let chatRoomData = {
                            users: [senderId, recepientId],
                        };
                        const chatRoom = new ChatRoom(chatRoomData);

                        await chatRoomRepository.createChatRoom(chatRoom);
                    }
                }

                // get all chat rooms
                const allChatRooms: IChatRoomDocument[] | [] =
                    await chatRoomRepository.getAllChatRoomsByUserId(senderId);

                const user: activeUser | undefined = getOnlineUser(senderId);
                if (user) {
                    io.to(user.socketId).emit("getAllChatRooms", allChatRooms);
                }
            } catch (error: unknown) {
                console.log(error);
                throw new Error("Error processing message:");
            }
        }
    );

    // adding a user to active list
    socket.on("addActiveUser", (userId: string) => {
        console.log("In addActiveUser event", userId);

        addUserToOnline(userId, socket.id);
        io.emit("getActiveUsers", activeUsers);
    });

    // send and get message
    socket.on("sendMessage", async (data: IMessage) => {
        console.log("In sendMessage event");
        console.log("chat message received in server ---->", data);

        try {
            const { senderId, roomId, textMessage } = data;

            if (!textMessage)
                throw new BadRequestError("please provide message");

            const sender: IUserDocument | null =
                await userRepository.getById(senderId);
            if (!sender) throw new BadRequestError("sender not found");

            const room: IChatRoomDocument | null =
                await chatRoomRepository.getById(roomId);
            if (!room) throw new NotFoundError("Room not found");

            const messageData: IMessageDocument =
                await messageRepository.createMessage({
                    senderId,
                    roomId,
                    textMessage,
                });

            // update last message in chat room
            await chatRoomRepository.updateAChatRoom(roomId, textMessage);

            const recipient: string = getRecepient(senderId, room);
            const recipientExist: IUserDocument | null =
                await userRepository.getById(recipient);
            if (!recipientExist)
                throw new BadRequestError("Recepient not found");

            const message = {
                messageData,
                senderId: senderId,
                recipient: recipient,
            };

            const notification: INotificationDocument =
                await notificationRepository.create({
                    senderId,
                    targetUserId: recipient,
                    message: textMessage,
                });

            const activeUserSender: activeUser | undefined = getOnlineUser(senderId);
            const activeUserRecipient: activeUser | undefined = getOnlineUser(recipient);
            if (activeUserSender && activeUserSender.socketId)
                io.to(activeUserSender.socketId).emit("receiveMessage", message);

            if (activeUserRecipient && activeUserRecipient.socketId) {
                io.to(activeUserRecipient.socketId).emit("receiveMessage", message);
                io.to(activeUserRecipient.socketId).emit(
                    "chatNotification",
                    notification
                );
            }
        } catch (error) {
            console.error("Error processing message:", error);
            throw new Error("Error processing message");
        }
    });

    socket.on("markAsRead", async (messageId: string) => {
        console.log("In markAsRead event");
        await messageRepository.setReadMessage(messageId);
        io.emit("messageRead", messageId);
    });

    // when a user disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!!!");
        removeUserFromOnline(socket.id);
        io.emit("getActiveUsers", activeUsers);
    });
};
