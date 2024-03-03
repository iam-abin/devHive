import schemas from "../../database/mongo/models";

const { MessageModel, ChatRoomModel } = schemas;

export = {
	createMessage: async (message: any) => {
		console.log("message inside create message ", message);
		const chatMessage = MessageModel.buildMessage(message);

		console.log("chatMessage inside create message ", chatMessage);
		return await chatMessage.save();
	},

	getChatMessages: async (roomId: string) => {
		const chatMessages = await MessageModel.find({
			roomId: roomId,
		});
		return chatMessages;
	},

	setReadMessage: async (messageId: string) => {
		// const result = await messageRepository.setReadMessage(messageId);
		let message = await MessageModel.updateOne(
			{ _id: messageId },
			{ $set: { read: true } },
			{ new: true }
		);
		return message;
	},
};
