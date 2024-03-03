import schemas from "../../database/mongo/models";

const { MessageModel, ChatRoomModel } = schemas;

export = {
	createChatRoom: async (chatRoomData: any) => {
		// let arr = [];
		// arr.push(sender);
		// arr.push(recipient);
		const chatRoom = ChatRoomModel.buildChatRoom(chatRoomData);
		console.log("in createChatRoom repository");

		return await chatRoom.save();
	},

	getAChatRoomById: async (chatRoomId: string) => {
		const chatRoom = await ChatRoomModel.findById({ _id: chatRoomId });
		console.log("inside getAChatRoomById chatRoom ", chatRoom);

		return chatRoom;
	},

	getAChatRoom: async (sender: string, recipient: string) => {
		const chatRooms = await ChatRoomModel.find({
			users: { $all: [sender, recipient] },
		});
		return chatRooms;
	},

	getAllChatRoomsByUserId: async (userId: string) => {
		const chatRooms = await ChatRoomModel.find({
			users: { $elemMatch: { $eq: userId } },
		}).populate('users').lean();
		
		console.log("in getAllChatRoomsByUserId repository ", chatRooms);

		return chatRooms;
	},
};
