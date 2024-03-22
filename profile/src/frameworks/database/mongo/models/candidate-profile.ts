import mongoose from "mongoose";

// 1. An interface that describes the properties ,that are requried to create a new Candidate
interface CandidateAttributes {
	userId?: string;
	name: string;
	email: string;
	phone: number;
	isVarified: boolean;
	isActive: boolean;
	gender: string;
	currentLocation: string;
	address: object;
	keySkills: object;
	profile_image: string;
	about: string;
	resume: {
		filename: string,
		url: string,
	  };
	experience: object;
}
// 2. An interface that describes the properties ,that a Candidate Document has
interface CandidateDocument extends mongoose.Document {
	name: string;
	email: string;
	phone: number;
	userType: string;
	isVarified: boolean;
	isActive: boolean;
	gender: string;
	currentLocation: string;
	address: object;
	keySkills: object;
	profile_image: string;
	about: string;
	resume: string;
	experience: object;
	isPremiumUser: boolean;
	preferredJobs: string[];
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
			default: "candidate",
		},
		isVarified: {
			// field for signup email verificetion
			// data will come to profile service only after verification
			type: Boolean,
			default: true,
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
interface CandidateProfileModel extends mongoose.Model<CandidateDocument> {
	buildCandidate(attributes: CandidateAttributes): CandidateDocument;
}

// 5.In Mongoose, you can also add custom functions to a model using statics.
candidateSchema.statics.buildCandidate = (attributes: CandidateAttributes) => {
	console.log("inside build candidate ", attributes);
	// const userId =  new mongoose.Types.ObjectId(attributes.userId);
	let userId: String | undefined = attributes.userId;
	delete attributes.userId;

	return new CandidateProfileModel({ _id: userId, ...attributes });
};

// 6. // 6.hover on 'Candidate' ,we can see that 'Candidate' is getting 'CandidateMdel', ie,a Second arg indicate returning type
const CandidateProfileModel = mongoose.model<
	CandidateDocument,
	CandidateProfileModel
>("Candidate", candidateSchema);

export { CandidateProfileModel };
