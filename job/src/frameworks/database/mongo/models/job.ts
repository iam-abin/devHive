import mongoose from "mongoose";

interface JobAttributes {
	title: string;
	recruiter: string;
	company: string;
	job_descriptions?: boolean;
	skills_required?: string;
	available_position?: string;
	experience_required?: boolean;
	education_required?: object;
	location?: object;
	employment_type?: string;
	salary_min?: number;
	salary_max?: number;
	has_applied?: boolean;
	blocked?: boolean;
	deadline?: Date;
	number_applied?: number;
	number_rejected?: number;
}

interface JobDocument extends mongoose.Document {
	title: string;
	recruiter: string;
	company: string;
	job_descriptions?: boolean;
	skills_required?: string;
	available_position?: string;
	experience_required?: boolean;
	education_required?: object;
	location?: object;
	employment_type?: string;
	salary_min?: number;
	salary_max?: number;
	has_applied?: boolean;
	blocked?: boolean;
	deadline?: Date;
	number_applied?: number;
	number_rejected?: number;
	createdAt: string;
	updatedAt: string;
}

const jobSchema = new mongoose.Schema(
	{
		title: String,
		recruiter: String,
		company: String,
		job_descriptions: Boolean,
		skills_required: String,
		available_position: String,
		experience_required: Boolean,
		education_required: Object,
		location: Object,
		employment_type: String,
		salary_min: Number,
		salary_max: Number,
		has_applied: Boolean,
		blocked: Boolean,
		deadline: Date,
		number_applied: Number,
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
	return new JobModel({ attributes });
};

const JobModel = mongoose.model<JobDocument, JobModel>(
	"Job",
	jobSchema
);

export { JobModel };
