import mongoose from "mongoose";

// 1. An interface that describes the properties ,that are requried to create a new Candidate
interface RecruiterAttributes {
	userId?: string;
	name: string;
	email: string;
	phone: number;
	isVarified: boolean;
	isActive: boolean;
	// gender?: string;
	// profile_image?: string;
	// about?: string;
	// // company_id?: string;
	// company_name: string;
	// company_website?: string;
	// company_location: string;
	// company_state?: string;
	// company_country?: string;
	// // isActive: boolean;
}
// 2. An interface that describes the properties ,that a Candidate Document has
interface RecruiterDocument extends mongoose.Document {
	name: string;
	email: string;
	phone: number;
	userType: string;
	isVarified: boolean;
	isActive: boolean;
	gender: string;
	profile_image: string;
	about: string;

	// company_id?: mongoose.Schema.Types.ObjectId;
	company_name: string;
	// logo: string;
	company_website: string;
	company_location: string;
	company_state: string;
	company_country: string;

	createdAt: string;
	updatedAt: string;
	// "membership": "no"
}

// 3.
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
		userType: {
			type: String,
			default: "recruiter",
		},
		isVarified: {
			// field for signup email verificetion
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
		// company_name: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: "Company",
		// },
		profile_image: {
			type: String,
			// default:
			// 	"https://res.cloudinary.com/dprxebwil/image/upload/v1679341215/Recruiter/recruiter-images.jpeg.jpg",
		},
		about: String,
		// company_id: mongoose.Schema.Types.ObjectId,
		// userId: mongoose.Schema.Types.ObjectId
		company_name:{
			type: String,
			required: true
		},
		// logo: String,
		company_website: {
			type: String,
			required: false
		},
		company_location: {
			type: String,
			required: true
		},
		company_state: String,
		company_country: String,
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

// 4. An interface that describes the properties ,that a recruiter model has
interface RecruiterProfileModel extends mongoose.Model<RecruiterDocument> {
	buildRecruiter(attributes: RecruiterAttributes): RecruiterDocument;
}

// 5.In Mongoose, you can also add custom functions to a model using statics.
recruiterSchema.statics.buildRecruiter = (attributes: RecruiterAttributes) => {
	console.log("inside build candidate ", attributes);
	// const userId =  new mongoose.Types.ObjectId(attributes.userId);
	let userId: String | undefined = attributes.userId;
	delete attributes.userId;

	console.log("--------------------------");
	console.log("inside recruiter model attributes ", attributes);
	console.log("--------------------------");
	

	return new RecruiterProfileModel({ _id: userId, ...attributes });
};

// 6. // 6.hover on 'Recruiter' ,we can see that 'Recruiter' is getting 'RecruiterProfileModel', ie,a Second arg indicate returning type
const RecruiterProfileModel = mongoose.model<
	RecruiterDocument,
	RecruiterProfileModel
>("Recruiter", recruiterSchema);

export { RecruiterProfileModel };
