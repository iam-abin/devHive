import mongoose from "mongoose";
import { IUser } from "../../../types/user";

interface IUserAttributes extends IUser {}

interface IUserDocument extends mongoose.Document, IUser {}

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


interface UserModel extends mongoose.Model<IUserDocument> {
    buildUser(attributes: IUserAttributes): IUserDocument;
}

userSchema.statics.buildUser = (attributes: IUserAttributes) => {
    return new UserModel({
        // to create a new user document
        _id: attributes.userId,
        name: attributes.name,
        profile_image: attributes.profile_image,
        role: attributes.role,
    });
};


const UserModel = mongoose.model<IUserDocument, UserModel>("User", userSchema);

export { UserModel };
