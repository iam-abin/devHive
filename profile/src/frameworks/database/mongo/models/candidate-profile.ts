import mongoose from "mongoose";

// 1. An interface that describes the properties ,that are requried to create a new Candidate
interface CandidateAttributes {
	name: string;
	email: string;
	phone: number;
	// userType: string;
	// isVarified: boolean;
	isActive: boolean;
	gender: string;
	currentLocation: string;
	address: object;
	keySkills: object;
	profile_image: string;
	about: string;
	resume: string;
	experience: object;
	userId: string;
	// isActive: boolean;
	// userId: string;
}
// 2. An interface that describes the properties ,that a Candidate Document has
interface CandidateDocument extends mongoose.Document {
	name: string;
	email: string;
	phone: number;
	// userType: string;
	// isVarified: boolean;
	isActive: boolean;
	gender: string;
	currentLocation: string;
	address: object;
	keySkills: object;
	profile_image: string;
	about: string;
	resume: string;
	experience: object;


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
		userType: {
			type: String,
			default: "candidate"
		},
		isVarified: {
			// field for signup email verificetion
			type: Boolean,
			default: false,
		},
		isActive: {
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
		keySkills: Array,
		profile_image: {
			type: String,
			// default:
			// 	"https://res.cloudinary.com/dprxebwil/image/upload/v1679341215/Recruiter/recruiter-images.jpeg.jpg",
		},
		about: String,
		resume: String,
		experience: Object,
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

// 4. An interface that describes the properties ,that a candidate model has
interface CandidateProfileModel extends mongoose.Model<CandidateDocument> {
	buildCandidate(attributes: CandidateAttributes): CandidateDocument;
}

// 5.In Mongoose, you can also add custom functions to a model using statics.
candidateSchema.statics.buildCandidate = (attributes: CandidateAttributes) => {
	return new CandidateProfileModel({attributes});
};

// 6. // 6.hover on 'Candidate' ,we can see that 'Candidate' is getting 'CandidateMdel', ie,a Second arg indicate returning type
const CandidateProfileModel = mongoose.model<CandidateDocument, CandidateProfileModel>("Candidate", candidateSchema);

export { CandidateProfileModel };
