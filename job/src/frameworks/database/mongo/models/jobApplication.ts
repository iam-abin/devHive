import mongoose from "mongoose";
import { IJobApplication } from "../../../types/jobApplication";

export interface IJobApplicationDocument extends mongoose.Document {
	jobId: mongoose.Schema.Types.ObjectId;
	candidateId:mongoose.Schema.Types.ObjectId;
	recruiterId:mongoose.Schema.Types.ObjectId;
	applicationStatus: string;
}

const jobApplicationSchema = new mongoose.Schema ({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: [true, 'Please add the job id']
    },
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please add the candidate id']
    },
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please add the recruiter id']
    },
    applicationStatus: {
        type: String,
        default: 'Applied',
        enum: ['Applied' ,'Rejected', 'Shortlisted',]
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
});

interface jobApplicationModel extends mongoose.Model<IJobApplicationDocument> {
	buildJob(attributes: IJobApplication): IJobApplicationDocument;
}


jobApplicationSchema.statics.buildJob = (attributes: IJobApplication) => {

    // Build the job application document
    return new jobApplicationModel(attributes);
};


export const jobApplicationModel = mongoose.model<IJobApplicationDocument, jobApplicationModel>(
	"jobApplication",
	jobApplicationSchema
);
