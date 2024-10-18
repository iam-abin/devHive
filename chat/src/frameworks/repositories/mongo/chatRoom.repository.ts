import Models from "../../database/mongo/models";
import { IChatRoomDocument } from "../../database/mongo/models/chatRoom";
import { IChatRoom } from "../../types/chatRoom";

const { ChatRoomModel } = Models;

export = {
    createChatRoom: async (chatRoomData: IChatRoom): Promise<IChatRoomDocument> => {
        const chatRoom = ChatRoomModel.buildChatRoom(chatRoomData);
        return await chatRoom.save();
    },

    getById: async (chatRoomId: string): Promise<IChatRoomDocument | null> => {
        const chatRoom = await ChatRoomModel.findById(chatRoomId);
        return chatRoom;
    },

    getAChatRoom: async (sender: string, recipient: string): Promise<IChatRoomDocument | null> => {
        const chatRoom = await ChatRoomModel.findOne({
            users: { $all: [sender, recipient] },
        });
        return chatRoom;
    },

    updateAChatRoom: async (roomId: string, message: string): Promise<IChatRoomDocument | null> => {
        const chatRooms = await ChatRoomModel.findByIdAndUpdate(
            roomId,
            { $set: { lastMessage: message } },
            { new: true }
        );
        return chatRooms;
    },

    getAllChatRoomsByUserId: async (userId: string): Promise<IChatRoomDocument[] | []> => {
        const chatRooms = await ChatRoomModel.find({
            users: { $elemMatch: { $eq: userId } },
        })
            .sort({ updatedAt: -1 })
            .populate("users")
            .lean();

        return chatRooms;
    },
};
