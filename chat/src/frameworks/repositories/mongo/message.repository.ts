import Models from "../../database/mongo/models";
import { IMessageDocument } from "../../database/mongo/models/message";
import { IMessage } from "../../types/message";

const { MessageModel } = Models;

export = {
    createMessage: async (message: IMessage): Promise<IMessageDocument> => {
        const chatMessage = MessageModel.buildMessage(message);
        return await chatMessage.save();
    },

    getChatMessages: async (roomId: string): Promise<IMessageDocument[] | []> => {
        const chatMessages = await MessageModel.find({
            roomId: roomId,
        });
        return chatMessages;
    },

    setReadMessage: async (messageId: string): Promise<IMessageDocument | null>  => {
        let message = await MessageModel.findByIdAndUpdate(
            messageId,
            { $set: { read: true } },
            { new: true }
        );
        return message;
    },
};
