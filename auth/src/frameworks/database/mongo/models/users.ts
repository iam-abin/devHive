import mongoose from "mongoose";
import { generateHashedPassword } from "../../../utils/password";
import { ISignup } from "../../../types/user";

// 1. An interface that describes the properties ,that are requried to create a new User

// 2. An interface that describes the properties ,that a User Document has
interface UserDocument extends mongoose.Document, ISignup {
	isVarified:boolean;
	isActive: boolean;
}

// 3.
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		phone: {
			type: Number,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		role: {
			type: String,
			required: true,
			enum: ["admin", "candidate", "recruiter"],
		},
		isVarified: {  // field for signup email verificetion
			type: Boolean,
			default: false,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		otp: Number,
	},
	{
		// to reformat id and remove password,__v from response when converting to json (we can also use other approaches)
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.password;
				delete ret.__v;
			},
		},
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}

	try {
		const hashedPassword = await generateHashedPassword(this.password);
		this.password = hashedPassword;
		next();
	} catch (error: unknown) {
		next(error as Error)
	}
});

// To hash password before saving the updated password to db
userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate() as Partial<ISignup>;
    if (!update.password) return next();

    try {
        const hashedPassword: string = await generateHashedPassword(update.password);
        this.setUpdate({ ...update, password: hashedPassword });
        next();
    } catch (error: unknown) {
        next(error as Error);
    }
});


// 4. An interface that describes the properties ,that a user model has
interface UserModel extends mongoose.Model<UserDocument> {
	buildUser(attributes: ISignup): UserDocument;
}

// 5.In Mongoose, you can also add custom functions to a model using statics.
userSchema.statics.buildUser = (attributes: ISignup) => {
	return new UserModel({
		// to create a new user document
		name: attributes.name,
		email: attributes.email,
		phone: attributes.phone,
		password: attributes.password,
		role: attributes.role,
		otp: attributes.otp,
	});
};

// 6. // 6.hover on 'User' ,we can see that 'User' is getting 'UserMdel', ie,a Second arg indicate returning type
const UserModel = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { UserModel };
