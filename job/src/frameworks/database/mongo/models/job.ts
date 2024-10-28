import mongoose from 'mongoose';
import { IJob } from '../../../types/job';

export interface IJobDocument extends mongoose.Document, Omit<IJob, 'recruiterId'> {
    recruiterId: mongoose.Schema.Types.ObjectId;
    isActive: boolean;
}

const jobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        recruiterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        companyName: { type: String, required: true },
        companyLocation: { type: String, required: true },
        jobDescription: String,
        skills: Array<string>,
        availablePosition: String,
        experienceRequired: String,
        educationRequired: String,
        employmentType: {
            type: String,
            enum: ['full-time', 'part-time', 'internship', 'contract'],
            default: 'full-time',
        },
        salaryMin: Number,
        salaryMax: Number,
        deadline: Date,
        isActive: {
            type: Boolean,
            default: true,
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
    },
);

interface JobModel extends mongoose.Model<IJobDocument> {
    buildJob(attributes: IJob): IJobDocument;
}

jobSchema.statics.buildJob = (attributes: IJob) => {
    // Create ObjectId instances or set to null if not provided
    return new JobModel(attributes);
};

export const JobModel = mongoose.model<IJobDocument, JobModel>('Job', jobSchema);
