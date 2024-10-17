import mongoose from "mongoose";
import { IUser } from "../../types/candidateInterface";

// 1. An interface that describes the properties ,that are requried to create a new Candidate
interface ICandidateAttributes extends IUser {}

// 2. An interface that describes the properties ,that a Candidate Document has
export interface ICandidateDocument extends mongoose.Document, Omit<IUser, "userId"> {
	_id: mongoose.Schema.Types.ObjectId,
    gender?: string;
    currentLocation?: string;
    address?: object;
    skills?: string[];
    profile_image?: string;
    about?: string;
    resume: {
        filename: string;
        url: string;
    };
    experience?: string;
}

// 3.
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
        profile_image: {
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
        // to reformat id and remove __v from response when converting to json (we can also use other approaches)
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

// 4. An interface that describes the properties ,that a candidate model has
interface CandidateModel extends mongoose.Model<ICandidateDocument> {
    buildCandidate(attributes: ICandidateAttributes): ICandidateDocument;
}

// 5.In Mongoose, you can also add custom functions to a model using statics.
candidateSchema.statics.buildCandidate = (attributes: ICandidateAttributes) => {
    const { userId, ...rest } = attributes;
    return new CandidateModel({
        // to create a new candidate document
        ...rest,
        _id: attributes.userId,
    });
};

// 6. // 6.hover on 'Candidate' ,we can see that 'Candidate' is getting 'CandidateModel', ie,a Second arg indicate returning type
export const CandidateModel = mongoose.model<ICandidateDocument, CandidateModel>(
    "Candidate",
    candidateSchema
);

