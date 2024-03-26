import schemas from "../../database/mongo/models";

const { MessageModel, ChatRoomModel } = schemas;

export = {
	createChatRoom: async (chatRoomData: any) => {
		const chatRoom = ChatRoomModel.buildChatRoom(chatRoomData);
		console.log("in createChatRoom repository");

		return await chatRoom.save();
	},

	getAChatRoomById: async (chatRoomId: string) => {
		const chatRoom = await ChatRoomModel.findById({ _id: chatRoomId });
		return chatRoom;
	},

	getAChatRoom: async (sender: string, recipient: string) => {
		const chatRooms = await ChatRoomModel.find({
			users: { $all: [sender, recipient] },
		});
		return chatRooms;
	},

	updateAChatRoom: async ( roomId: string, message: string) => {
		const chatRooms = await ChatRoomModel.updateOne(
			{  _id: roomId },
			{ $set: { lastMessage: message } },
			{ new: true }
		);
		return chatRooms;
	},
	
	getAllChatRoomsByUserId: async (userId: string) => {
		const chatRooms = await ChatRoomModel.find({
			users: { $elemMatch: { $eq: userId } },
		}).sort({ updatedAt: -1 }).populate('users').lean();
		
		console.log("in getAllChatRoomsByUserId repository ", chatRooms);

		return chatRooms;
	},
};
