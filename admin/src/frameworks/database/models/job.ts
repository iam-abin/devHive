import mongoose from 'mongoose';
import { IJob } from '../../types/job';

export type JobDocument = mongoose.Document & Omit<IJob, 'jobId'>;

const jobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        recruiterId: { type: String, required: true },
        companyName: { type: String, required: true },
        companyLocation: { type: String, required: true },
        jobDescription: String,
        skills: Array<string>,
        availablePosition: Number,
        experienceRequired: Number,
        educationRequired: String,
        employmentType: String,
        salaryMin: Number,
        salaryMax: Number,
        isActive: {
            type: Boolean,
            default: true,
        },
        deadline: Date,
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
    },
);

interface JobModel extends mongoose.Model<JobDocument> {
    buildJob(attributes: IJob): JobDocument;
}

jobSchema.statics.buildJob = (attributes: IJob) => {
    const { jobId, ...rest } = attributes;
    return new JobModel({ ...rest, _id: jobId });
};

export const JobModel = mongoose.model<JobDocument, JobModel>('Job', jobSchema);
