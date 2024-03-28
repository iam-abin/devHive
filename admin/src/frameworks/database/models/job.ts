import mongoose from "mongoose";

interface JobAttributes {
	title: string;
	recruiter: string;
	company_name?: string;
	company_location?: string;
	job_descriptions?: string;
	skills_required?: string | string[];
	available_position?: string;
	experience_required?: string;
	education_required?: string;
	location?: string;
	employment_type?: string;
	salary_min?: number;
	salary_max?: number;
	isActive?: boolean;
	deadline?: Date;
	jobId: string;
}

interface JobDocument extends mongoose.Document {
	title: string;
	recruiter: string;
	company_name?: string;
	company_location?: string;
	job_descriptions?: string;
	skills_required?: string | string[];
	available_position?: string;
	experience_required?: string;
	education_required?: string;
	location?: string;
	employment_type?: string;
	salary_min?: number;
	salary_max?: number;
	isActive?: boolean;
	deadline?: Date;
	jobId: mongoose.Schema.Types.ObjectId;
	createdAt: string;
	updatedAt: string;
}

const jobSchema = new mongoose.Schema(
	{
		title: String,
		recruiter: String,
		// company: String,
		company_name: String,
		company_location: String,
		job_descriptions: String,
		skills_required: Array,
		available_position: String,
		experience_required: String,
		education_required: String,
		location: String,
		employment_type: String,
		salary_min: Number,
		salary_max: Number,
		isActive: {
			type: Boolean,
			default: true,
		},
		deadline: Date,
		jobId: mongoose.Schema.Types.ObjectId,
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
	
	const jobId = new mongoose.Types.ObjectId(attributes.jobId);

	return new JobModel({ ...attributes, jobId });
};

const JobModel = mongoose.model<JobDocument, JobModel>("Job", jobSchema);

export { JobModel };
