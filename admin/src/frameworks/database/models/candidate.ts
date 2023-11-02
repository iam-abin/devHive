import mongoose from "mongoose";

// 1. An interface that describes the properties ,that are requried to create a new Candidate
interface CandidateAttributes {
	name: string;
	email: string;
	phone: number;
    profile_pic?: string;
	password: string;
	userType: string;
	// userId: string;
}

// 2. An interface that describes the properties ,that a Candidate Document has
interface CandidateDocument extends mongoose.Document {
	name: string;
	email: string;
	phone: number;
    profile_pic: string;
	userType: string;
	isActive: boolean;
	userId: string;
	createdAt: string;
	updatedAt: string;
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
        profile_pic: String,
		userType: {
			type: String,
			required: true,
			enum: ["admin", "candidate", "recruiter"],
		},
		isActive: {
			type: Boolean,
			default: true,
		},
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
interface CandidateModel extends mongoose.Model<CandidateDocument> {
	buildCandidate(attributes: CandidateAttributes): CandidateDocument;
}

// 5.In Mongoose, you can also add custom functions to a model using statics.
candidateSchema.statics.buildCandidate = (attributes: CandidateAttributes) => {
	return new CandidateModel({
		// to create a new candidate document
		// _id: attributes.userId,
		name: attributes.name,
		email: attributes.email,
		profile_pic: attributes.profile_pic,
        
		phone: attributes.phone,
		userType: attributes.userType,
		// isActive: attributes.isActive,
	});
};

// 6. // 6.hover on 'Candidate' ,we can see that 'Candidate' is getting 'CandidateModel', ie,a Second arg indicate returning type
const CandidateModel = mongoose.model<CandidateDocument, CandidateModel>("Candidate", candidateSchema);

export { CandidateModel };