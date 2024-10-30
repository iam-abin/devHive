import mongoose from 'mongoose';
import { ICandidateProfile } from '../../../types/candidate';
import { IUser } from '../../../types/user';
import { ROLES } from '@abijobportal/common';

export interface ICandidateDocument extends mongoose.Document, Omit<ICandidateProfile, 'userId'> {
    _id: mongoose.Schema.Types.ObjectId;
}

const candidateSchema = new mongoose.Schema(
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
            default: ROLES.CANDIDATE,
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
        },
        currentLocation: String,
        skills: Array,
        profileImage: String,
        about: String,
        resume: {
            filename: String,
            url: String,
        },
        experience: Object,
        isPremiumUser: {
            type: Boolean,
            default: false,
        },
        preferredJobs: [String],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret: Record<string, string>) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
        timestamps: true,
    },
);

interface ICandidateProfileModel extends mongoose.Model<ICandidateDocument> {
    buildCandidate(attributes: IUser): ICandidateDocument;
}

candidateSchema.statics.buildCandidate = (attributes: IUser) => {
    const { userId, ...rest } = attributes;
    return new CandidateProfileModel({ ...rest, _id: userId });
};

const CandidateProfileModel = mongoose.model<ICandidateDocument, ICandidateProfileModel>(
    'Candidate',
    candidateSchema,
);

export { CandidateProfileModel };
