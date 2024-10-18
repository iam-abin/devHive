import mongoose from "mongoose";
import { IMessage } from "../../../types/message";

export interface IMessageDocument extends mongoose.Document {
	senderId: mongoose.Schema.Types.ObjectId;
	roomId: mongoose.Schema.Types.ObjectId;
	textMessage: string;
	read: boolean;
}

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
		read: { type: Boolean, default: false }
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

interface MessageModel extends mongoose.Model<IMessageDocument> {
	buildMessage(attributes: IMessage): IMessageDocument;
}

messageSchema.statics.buildMessage = (attributes: IMessage) => {
	return new MessageModel({
		senderId: attributes.senderId,
		roomId: attributes.roomId,
		textMessage: attributes.textMessage
	});
};

const MessageModel = mongoose.model<IMessageDocument, MessageModel>(
	"Message",
	messageSchema
);

export { MessageModel };
