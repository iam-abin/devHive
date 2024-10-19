import mongoose from "mongoose";
import { IUser } from "../../types/user";


export interface ICandidateDocument extends mongoose.Document, Omit<IUser, "userId"> {
	_id: mongoose.Schema.Types.ObjectId,
    gender: string;
    currentLocation: string;
    address: object;
    skills: string[];
    profileImage: string;
    about: string;
    resume: {
        filename: string;
        url: string;
    };
    experience: string;
    isActive: boolean;
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
            trim: true,
        },
        profile_pic: String,
        role: {
            type: String,
            required: true,
            enum: ["candidate"],
        },
        isActive: {
            type: Boolean,
            required: true,
        },

        gender: {
            type: String,
            enum: ["male", "female", "other"],
        },
        currentLocation: String,
        address: {
            houseNumber: String,
            street: String,
            city: String,
            state: String,
            country: String,
            pinCode: String,
        },
        skills: Array,
        profileImage: {
            type: String,
        },
        about: String,
        resume: {
            filename: String,
            url: String,
        },
        experience: String,
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

interface CandidateModel extends mongoose.Model<ICandidateDocument> {
    buildCandidate(attributes: IUser): ICandidateDocument;
}

candidateSchema.statics.buildCandidate = (attributes: IUser) => {
    const { userId, ...rest } = attributes;
    return new CandidateModel({
        ...rest,
        _id: attributes.userId,
    });
};

export const CandidateModel = mongoose.model<ICandidateDocument, CandidateModel>(
    "Candidate",
    candidateSchema
);

