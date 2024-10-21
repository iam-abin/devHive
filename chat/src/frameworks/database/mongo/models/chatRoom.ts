import mongoose from "mongoose";
import { IChatRoom } from "../../../types/chatRoom";

export interface IChatRoomDocument extends mongoose.Document {
    users: mongoose.Types.ObjectId[];
    lastMessage?: string;
}

const chatRoomSchema = new mongoose.Schema(
    {
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        lastMessage: String,
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
        timestamps: true,
    }
);

interface ChatRoomModel extends mongoose.Model<IChatRoomDocument> {
    buildChatRoom(attributes: IChatRoom): IChatRoomDocument;
}

chatRoomSchema.statics.buildChatRoom = (attributes: IChatRoom) => {
    return new ChatRoomModel({
        users: attributes.users,
    });
};

const ChatRoomModel = mongoose.model<IChatRoomDocument, ChatRoomModel>(
    "ChatRoom",
    chatRoomSchema
);

export { ChatRoomModel };
