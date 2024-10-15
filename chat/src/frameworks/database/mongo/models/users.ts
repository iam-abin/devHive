import mongoose from "mongoose";
// 1. An interface that describes the properties ,that are requried to create a new User
interface UserAttributes {
	userId: string;
	name: string;
	profile_image: number;
	role: string;
}
// 2. An interface that describes the properties ,that a User Document has
interface UserDocument extends mongoose.Document {
	// _id: mongoose.Schema.Types.ObjectId;
	name: string;
	profile_image: number;
	role: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}

// 3.
const userSchema = new mongoose.Schema(
	{
		// userId: mongoose.Schema.Types.ObjectId,
		name: String,
		profile_image: String,
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
interface UserModel extends mongoose.Model<UserDocument> {
	buildUser(attributes: UserAttributes): UserDocument;
}

// 5.In Mongoose, you can also add custom functions to a model using statics.
userSchema.statics.buildUser = (attributes: UserAttributes) => {
	return new UserModel({
		// to create a new user document
		_id: attributes.userId,
		name: attributes.name,
		profile_image: attributes.profile_image,
		role: attributes.role,
	});
};

// 6. // 6.hover on 'User' ,we can see that 'User' is getting 'UserMdel', ie,a Second arg indicate returning type
const UserModel = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { UserModel };
