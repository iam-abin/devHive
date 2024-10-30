import mongoose from 'mongoose';
import { generateHashedPassword } from '../../../utils/password';
import { ISignup } from '../../../types/user';
import { ROLES } from '@abijobportal/common';

export interface IUserDocument extends mongoose.Document, ISignup {
    isVerified: boolean;
    isActive: boolean;
}

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
            enum: [ROLES.ADMIN, ROLES.CANDIDATE, ROLES.RECRUITER],
        },
        isVerified: {
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
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            },
        },
        timestamps: true,
    },
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const hashedPassword = await generateHashedPassword(this.password);
        this.password = hashedPassword;
        next();
    } catch (error: unknown) {
        next(error as Error);
    }
});

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

interface UserModel extends mongoose.Model<IUserDocument> {
    buildUser(attributes: ISignup): IUserDocument;
}

userSchema.statics.buildUser = (attributes: ISignup) => {
    return new UserModel({
        name: attributes.name,
        email: attributes.email,
        phone: attributes.phone,
        password: attributes.password,
        role: attributes.role,
        otp: attributes.otp,
    });
};

const UserModel = mongoose.model<IUserDocument, UserModel>('User', userSchema);

export { UserModel };
