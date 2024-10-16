import mongoose from "mongoose";
interface ChatRoomAttributes {
    users: string[];
}
interface ChatRoomDocument extends mongoose.Document {
    users: mongoose.Types.ObjectId[];
    lastMessage?: string;
}

const chatRoomSchema = new mongoose.Schema(
    {
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
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

interface ChatRoomModel extends mongoose.Model<ChatRoomDocument> {
    buildChatRoom(attributes: ChatRoomAttributes): ChatRoomDocument;
}

chatRoomSchema.statics.buildChatRoom = (attributes: ChatRoomAttributes) => {
    return new ChatRoomModel({
        users: attributes.users,
    });
};

const ChatRoomModel = mongoose.model<ChatRoomDocument, ChatRoomModel>(
    "ChatRoom",
    chatRoomSchema
);

export { ChatRoomModel };
