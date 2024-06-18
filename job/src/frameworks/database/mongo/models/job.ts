import mongoose from "mongoose";

interface IJobAttributes {
	title: string;
	recruiterId: string;
	// company_name: string,
	// companyId: string;
	company_name: string;
	company_location: string;

	job_descriptions?: string;
	skills_required?: string | string[];
	available_position?: string;
	experience_required?: string;
	education_required?: string;
	employment_type?: string;
	salary_min?: number;
	salary_max?: number;
	deadline?: Date;
}

interface IJobDocument extends mongoose.Document {
	title: string;
	recruiterId: mongoose.Schema.Types.ObjectId;
	company_name: string;
	company_location: string;
	// companyId: mongoose.Schema.Types.ObjectId;
	job_descriptions?: string;
	skills_required?: string | string[];
	available_position?: string;
	experience_required?: string;
	education_required?: string;
	employment_type?: string;
	salary_min?: number;
	salary_max?: number;
	has_applied?: boolean;
	isActive?: boolean;
	deadline?: Date;
	number_applied?: number;
	number_hired?: number;
	number_rejected?: number;
	isClosed?: boolean;
	createdAt: string;
	updatedAt: string;
}

const jobSchema = new mongoose.Schema(
	{
		title: String,
		recruiterId: mongoose.Schema.Types.ObjectId,
		company_name: String,
		company_location: String,
		// companyId: mongoose.Schema.Types.ObjectId,
		job_descriptions: String,
		skills_required: Array,
		available_position: String,
		experience_required: String,
		education_required: String,
		employment_type: {
			type: String,
			enum: ["full-time", "part-time", "internship", "contract"],
			default: "full-time",
		},
		salary_min: Number,
		salary_max: Number,
		has_applied: {
			type: Boolean,
			default: false,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		deadline: Date,
		number_applied: Number,
		number_hired: Number,
		number_rejected: Number,
		isClosed: {
			type: Boolean,
			default: false,
		},
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

interface JobModel extends mongoose.Model<IJobDocument> {
	buildJob(attributes: IJobAttributes): IJobDocument;
}

jobSchema.statics.buildJob = (attributes: IJobAttributes) => {
	
	if (
		attributes.recruiterId &&
		!mongoose.Types.ObjectId.isValid(attributes.recruiterId)
	) {
		throw new Error("Invalid ObjectId format for recruiterId");
	}

	// Create ObjectId instances or set to null if not provided
	const recruiterId = attributes.recruiterId
		? new mongoose.Types.ObjectId(attributes.recruiterId)
		: null;

	return new JobModel({ ...attributes, recruiterId });
};

const JobModel = mongoose.model<IJobDocument, JobModel>("Job", jobSchema);

export { JobModel };
