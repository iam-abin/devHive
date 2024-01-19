import mongoose from "mongoose";
// 1. An interface that describes the properties ,that are requried to create a new Chat
interface ChatRoomAttributes {
	users: mongoose.Types.ObjectId[];
	lastMessage: string;
	lastMessageTime: boolean;
}
// 2. An interface that describes the properties ,that a Chat Document has
interface ChatRoomDocument extends mongoose.Document {
	users: mongoose.Types.ObjectId[];
	lastMessage: string;
	lastMessageTime: boolean;
	createdAt: Date;
	updatedAt: Date;
}

// 3.
const chatRoomSchema = new mongoose.Schema(
	{

		users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		lastMessage: String,
		lastMessageTime: String,
	},
	{
		// to reformat id and remove password,__v from response when converting to json (we can also use other approaches)
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

// 4. An interface that describes the properties ,that a user model has
interface ChatRoomModel extends mongoose.Model<ChatRoomDocument> {
	buildChatRoom(attributes: ChatRoomAttributes): ChatRoomDocument;
}

// 5.In Mongoose, you can also add custom functions to a model using statics.
chatRoomSchema.statics.buildChatRoom = (attributes: ChatRoomAttributes) => {
	return new ChatRoomModel({
	  users: attributes.users,
	  lastMessage: attributes.lastMessage,
	  lastMessageTime: attributes.lastMessageTime,
	});
  };
// 6. // 6.hover on 'ChatRoom' ,we can see that 'ChatRoom' is getting 'ChatRoomModel', ie,a Second arg indicate returning type
const ChatRoomModel = mongoose.model<ChatRoomDocument, ChatRoomModel>("ChatRoom", chatRoomSchema);

export { ChatRoomModel };
