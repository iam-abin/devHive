import mongoose from 'mongoose';
import { IRecruiterProfile } from '../../../types/recruiter';
import { IUser } from '../../../types/user';

export interface IRecruiterDocument extends mongoose.Document, Omit<IRecruiterProfile, 'userId'> {
    _id: mongoose.Schema.Types.ObjectId;
}

const recruiterSchema = new mongoose.Schema(
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
        role: {
            type: String,
            default: 'recruiter',
        },
        isVerified: {
            type: Boolean,
            default: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
        },

        profileImage: {
            type: String,
        },
        about: String,

        companyName: {
            type: String,
        },

        companyWebsite: {
            type: String,
        },
        companyLocation: {
            type: String,
        },
        companyState: String,
        companyCountry: String,
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

interface RecruiterProfileModel extends mongoose.Model<IRecruiterDocument> {
    buildRecruiter(attributes: IUser): IRecruiterDocument;
}

recruiterSchema.statics.buildRecruiter = (attributes: IUser) => {
    const { userId, ...rest } = attributes;
    return new RecruiterProfileModel({ _id: userId, ...rest });
};

const RecruiterProfileModel = mongoose.model<IRecruiterDocument, RecruiterProfileModel>(
    'Recruiter',
    recruiterSchema,
);

export { RecruiterProfileModel };
