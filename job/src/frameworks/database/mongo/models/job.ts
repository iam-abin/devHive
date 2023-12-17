import mongoose from "mongoose";

interface JobAttributes {
	title: string;
	recruiterId: string;
	companyId: string;
	job_descriptions?: string;
	skills_required?:string | string[];
	available_position?: string;
	experience_required?: string;
	education_required?: string;
	location?: string;
	employment_type?: string;
	salary_min?: number;
	salary_max?: number;
	deadline?: Date;
}

interface JobDocument extends mongoose.Document {
	title: string;
	recruiterId: mongoose.Schema.Types.ObjectId;
	companyId: mongoose.Schema.Types.ObjectId;
	job_descriptions?: string;
	skills_required?: string | string[];
	available_position?: string;
	experience_required?: string;
	education_required?: string;
	location?: string;
	employment_type?: string;
	salary_min?: number;
	salary_max?: number;
	has_applied?: boolean;
	blocked?: boolean;
	deadline?: Date;
	number_applied?: number;
	number_hired?: number;
	number_rejected?: number;
	createdAt: string;
	updatedAt: string;
}

const jobSchema = new mongoose.Schema(
	{
		title: String,
		recruiterId: mongoose.Schema.Types.ObjectId,
		companyId: mongoose.Schema.Types.ObjectId,
		job_descriptions: String,
		skills_required: Array,
		available_position: String,
		experience_required: String,
		education_required: String,
		location: String,
		employment_type: String,
		salary_min: Number,
		salary_max: Number,
		has_applied: {
			type: Boolean,
			default: false
		},
		blocked:{
			type: Boolean,
			default: false
		},
		deadline: Date,
		number_applied: Number,
		number_hired: Number,
		number_rejected: Number,
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

interface JobModel extends mongoose.Model<JobDocument> {
	buildJob(attributes: JobAttributes): JobDocument;
}

jobSchema.statics.buildJob = (attributes: JobAttributes) => {
	console.log("in build job attributes", attributes);

    const recruiterId = new mongoose.Types.ObjectId(attributes.recruiterId);
	const companyId = new mongoose.Types.ObjectId(attributes.companyId);
	
	return new JobModel( {...attributes, recruiterId, companyId } );
};

const JobModel = mongoose.model<JobDocument, JobModel>(
	"Job",
	jobSchema
);

export { JobModel };
