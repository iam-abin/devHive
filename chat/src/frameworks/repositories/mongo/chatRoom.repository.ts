import schemas from "../../database/mongo/models";

const { MessageModel, ChatRoomModel } = schemas;

export = {
	createChatRoom: async (sender: string, recipient: string) => {
		let arr = [];
		arr.push(sender);
		arr.push(recipient);
		const chatRoom = ChatRoomModel.buildChatRoom(arr);
		console.log("in applyJob repository");

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
		});
		// .populate('users');
		console.log("in getAllChatRoomsByUserId repository ", chatRooms);

		return chatRooms;
	},
};
