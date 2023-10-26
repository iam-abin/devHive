import mongoose from "mongoose";

import schemas from "../../database/mongo/schemas";
const { userSchema } = schemas;

// 1.
interface UserAttributes {
	name: string;
	email: string;
	phone: number;
	password: string;
	role: string;
	isActive: boolean;
	// userId: string;
}

// 2.
interface UserDocument extends mongoose.Document {
	name: string;
	email: string;
	phone: number;
	password: string;
	role: string;
	isActive: boolean;
	userId: string;
	createdAt: string;
	updatedAt: string;
}

// 3.an interface that describes the properties that a user model has
interface UserModel extends mongoose.Model<UserDocument> {
	buildUser(attributes: UserAttributes): UserDocument;
}

// 4.In Mongoose, you can also add custom functions to a model using statics.
userSchema.statics.buildUser = (attributes: UserAttributes) => {
	return new User({
		// _id: attributes.userId,
		name: attributes.name,
		email: attributes.email,
		phone: attributes.phone,
		password: attributes.password,
		role: attributes.role,
		isActive: attributes.isActive,
	});
};

// 5.
const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

// we want to export some closure
const repository = () => {
	return {
		add: async () => {},

		update: async () => {},

		delete: async () => {},

		getById: async () => {},
	};
};

export default repository();
