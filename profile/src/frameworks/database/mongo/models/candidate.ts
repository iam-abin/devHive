import mongoose from "mongoose";
import { IAddress, ICandidate } from "../../../types/candidateProfile";

// 1. An interface that describes the properties ,that are requried to create a new Candidate
interface ICandidateAttributes extends ICandidate {}

// 2. An interface that describes the properties ,that a Candidate Document has
export interface ICandidateDocument extends mongoose.Document,  Omit<ICandidate, "userId"> {
	_id: mongoose.Schema.Types.ObjectId,
	isActive: boolean;
	gender: string;
	currentLocation: string;
	address: IAddress;
	skills: string[];
	profile_image: string;
	about: string;
	resume: {
        filename: string;
        url: string;
    };
	experience: string;
	isPremiumUser: boolean;
	preferredJobs: string[];
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
			required: true,
			trim: true,
		},
		role: {
			type: String,
			default: "candidate",
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		isVarified: {
			// field for signup email verificetion
			// data will come to profile service only after verification
			type: Boolean,
			default: true,
		},
		gender: {
			type: String,
			enum: ["Male", "Female", "Other"],
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
		profile_image: String,
		about: String,
		resume: {
			filename: String,
			url: String,
		  },
		experience: Object,
		isPremiumUser: {
			type: Boolean,
			default: false
		},
		preferredJobs: [String]
	},
	{
		// to reformat id and remove password,__v from response when converting to json (we can also use other approaches)
		toJSON: {
			transform(doc, ret: Record<string, any>) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			},
		},
		timestamps: true,
	}
);

// 4. An interface that describes the properties ,that a candidate model has
interface CandidateProfileModel extends mongoose.Model<ICandidateDocument> {
	buildCandidate(attributes: ICandidateAttributes): ICandidateDocument;
}

// 5.In Mongoose, you can also add custom functions to a model using statics.
candidateSchema.statics.buildCandidate = (attributes: ICandidateAttributes) => {
	
	// const userId =  new mongoose.Types.ObjectId(attributes.userId);
	// let userId: String | undefined = attributes.userId;
	// delete attributes.userId;
	const {userId, ...rest} = attributes

	return new CandidateProfileModel({ ...rest, _id: userId });
};

// 6. // 6.hover on 'Candidate' ,we can see that 'Candidate' is getting 'CandidateMdel', ie,a Second arg indicate returning type
const CandidateProfileModel = mongoose.model<
	ICandidateDocument,
	CandidateProfileModel
>("Candidate", candidateSchema);

export { CandidateProfileModel };
