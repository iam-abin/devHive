import mongoose from "mongoose";

// 1. An interface that describes the properties ,that are requried to create a new Recruiter
interface RecruiterAttributes {
	name: string;
	email: string;
	phone: number;
    profile_pic?: string;
	isActive: boolean;
	userType: string;
	userId: string;

    company?: string;
    bio?: string;
    membership?: string;
	// userId: string;
}

// 2. An interface that describes the properties ,that a Recruiter Documentt has
interface RecruiterDocument extends mongoose.Document {
	name: string;
	email: string;
	phone: number;
    profile_pic?: string;
	userType: string;
	isActive: boolean;
	userId: mongoose.Schema.Types.ObjectId;

    company?: String;
    bio?: String;
    membership?: String;
	createdAt: string;
	updatedAt: string;
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
			required: true
		},
		userId:mongoose.Schema.Types.ObjectId,

        company: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Company"
		},
        bio: String,
        membership: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Ticket"
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

// 4. An interface that describes the properties ,that a recruiter model has
interface RecruiterModel extends mongoose.Model<RecruiterDocument> {
	buildRecruiter(attributes: RecruiterAttributes): RecruiterDocument;
}

// 5.In Mongoose, you can also add custom functions to a model using statics.
recruiterSchema.statics.buildRecruiter = (attributes: RecruiterAttributes) => {
	console.log("recruiterSchema userType", attributes.userType);
	
	return new RecruiterModel({
		// to create a new recruiter document
		// userId: new mongoose.Types.ObjectId(attributes.userId),
		_id: attributes.userId,
		name: attributes.name,
		email: attributes.email,
		phone: attributes.phone,
		profile_pic: attributes.profile_pic,
		userType: attributes.userType,
		isActive: attributes.isActive,
        company: attributes.company,
        bio: attributes.bio,
        membership: attributes.membership,
        
	});
};

// 6. // 6.hover on 'Recruiter' ,we can see that 'Recruiter' is getting 'RecruiterModel', ie,a Second arg indicate returning type
const RecruiterModel = mongoose.model<RecruiterDocument, RecruiterModel>("Recruiter", recruiterSchema);

export { RecruiterModel };