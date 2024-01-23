import mongoose from "mongoose";
// 1. An interface that describes the properties ,that are requried to create a new Message
interface MessageAttributes {
	senderId: string;
	roomId: string;
	textMessage: string;
}

// 2. An interface that describes the properties ,that a Message Document has
interface MessageDocument extends mongoose.Document {
	senderId: mongoose.Schema.Types.ObjectId;
	roomId: mongoose.Schema.Types.ObjectId;
	textMessage: string;
	createdAt: string;
	updatedAt: string;
}

// 3.
const messageSchema = new mongoose.Schema(
	{

		senderId: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			require: true,
		},
	
		roomId: {
			type: mongoose.Types.ObjectId,
			ref: "ChatRoom",
			require: true,
		},
	
		textMessage: {
			type: String,
			trim: true,
		},
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

// 4. An interface that describes the properties ,that a message model has
interface MessageModel extends mongoose.Model<MessageDocument> {
	buildMessage(attributes: MessageAttributes): MessageDocument;
}

// 5.In Mongoose, you can also add custom functions to a model using statics.
messageSchema.statics.buildMessage = (attributes: MessageAttributes) => {
	return new MessageModel({
		// to create a new Message document
		senderId: attributes.senderId,
		roomId: attributes.roomId,
		textMessage: attributes.textMessage
	});
};

// 6. // 6.hover on 'Message' ,we can see that 'Message' is getting 'MessageMdel', ie,a Second arg indicate returning type
const MessageModel = mongoose.model<MessageDocument, MessageModel>(
	"Message",
	messageSchema
);

export { MessageModel };
