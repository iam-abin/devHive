import mongoose from "mongoose";
import { IJob } from "../../types/job";


interface IJobAttributes extends IJob{}

export interface IJobDocument extends mongoose.Document, Omit<IJobAttributes, "jobId"> {}

const jobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        recruiterId: { type: String, required: true },
        companyName: { type: String, required: true },
        companyLocation: { type: String, required: true },
        jobDescription: String,
        skills: Array<String>,
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
    }
);

interface JobModel extends mongoose.Model<IJobDocument> {
    buildJob(attributes: IJobAttributes): IJobDocument;
}

jobSchema.statics.buildJob = (attributes: IJobAttributes) => {
	const {jobId, ...rest} = attributes
    return new JobModel({ ...rest, _id: jobId });
};

export const JobModel = mongoose.model<IJobDocument, JobModel>("Job", jobSchema);

