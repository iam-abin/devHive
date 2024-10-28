import mongoose from 'mongoose';
import { IUser } from '../../types/user';

export interface IRecruiterDocument extends mongoose.Document, Omit<IUser, 'userId'> {
    _id: mongoose.Schema.Types.ObjectId;
    companyName?: string;
    companyLocation?: string;
    bio?: string;
}

const recruiterSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
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
            trim: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['recruiter'],
        },
        isActive: {
            type: Boolean,
            required: true,
        },
        companyName: String,
        companyLocation: String,
        bio: String,
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
    },
);

interface RecruiterModel extends mongoose.Model<IRecruiterDocument> {
    buildRecruiter(attributes: IUser): IRecruiterDocument;
}

recruiterSchema.statics.buildRecruiter = (attributes: IUser) => {
    const { userId, ...rest } = attributes;
    return new RecruiterModel({
        ...rest,
        _id: userId,
    });
};

export const RecruiterModel = mongoose.model<IRecruiterDocument, RecruiterModel>(
    'Recruiter',
    recruiterSchema,
);
