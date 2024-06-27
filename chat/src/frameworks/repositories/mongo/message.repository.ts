import Models from "../../database/mongo/models";

const { MessageModel, ChatRoomModel } = Models;

export = {
	createMessage: async (message: any) => {
		
		const chatMessage = MessageModel.buildMessage(message);
		
		return await chatMessage.save();
	},

	getChatMessages: async (roomId: string) => {
		const chatMessages = await MessageModel.find({
			roomId: roomId,
		});
		return chatMessages;
	},

	setReadMessage: async (messageId: string) => {
		let message = await MessageModel.updateOne(
			{ _id: messageId },
			{ $set: { read: true } },
			{ new: true }
		);
		return message;
	},
};
