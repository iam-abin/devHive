import mongoose from "mongoose";

import schemas from "../../database/mongo/schemas";
const { userSchema } = schemas;

// we want to export some closure
const repository = () => {
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
		return new UserModel({
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
	const UserModel = mongoose.model<UserDocument, UserModel>(
		"User",
		userSchema
	);

	return {
		register: async (userData: any) => {
			const userObject = new UserModel(userData);
			return userObject.save();
		},

		updatePassword: async ({ id , newPassword}: any) => {
			const user = await UserModel.findById({id});
			if(!user){
				throw new Error("User not found")
			}

			user.password = newPassword;
			return user.save()

		},

		// delete: async () => {},

		// getById: async () => {},
	};
};

export default repository();
