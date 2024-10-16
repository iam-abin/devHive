import mongoose from "mongoose";
import { IUser } from "../../../types/user";

export interface IUserDocument extends mongoose.Document, IUser {
	_id: mongoose.Schema.Types.ObjectId;
	name: string;
	email: string;
	profileImgUrl: number;
	role: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}


const userSchema = new mongoose.Schema(
	{
		name: String,
		email: String,
		profileImgUrl: String,
		role: {
			type: String,
			required: true,
			enum: ["candidate", "recruiter"],
		},
		isActive: {
			type: Boolean,
			default: true,
		},
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


interface UserModel extends mongoose.Model<IUserDocument> {
	buildUser(attributes: IUser): IUserDocument;
}


userSchema.statics.buildUser = (attributes: IUser) => {
	const {userId, ...rest} = attributes
	return new UserModel({

		_id: userId,
		...rest
	});
};


export const UserModel = mongoose.model<IUserDocument, UserModel>("User", userSchema);

