import mongoose from "mongoose";

interface IJobApplicationAttributes {
	jobId: string;
	candidateId:string;
	recruiterId:string;
	applicationStatus: string;
}

interface IJobApplicationDocument extends mongoose.Document {
	jobId: mongoose.Schema.Types.ObjectId;
	candidateId:mongoose.Schema.Types.ObjectId;
	recruiterId:mongoose.Schema.Types.ObjectId;
	applicationStatus: string;
	createdAt: string;
	updatedAt: string;
}
const jobApplicationSchema = new mongoose.Schema ({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: [true, 'Please add the job id']
    },
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidates',
        required: [true, 'Please add the candidate id']
    },
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiters',
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
	buildJob(attributes: IJobApplicationAttributes): IJobApplicationDocument;
}


jobApplicationSchema.statics.buildJob = (attributes: IJobApplicationAttributes) => {
    
    const jobId = new mongoose.Types.ObjectId(attributes.jobId);
    const candidateId = new mongoose.Types.ObjectId(attributes.candidateId);
    const recruiterId = new mongoose.Types.ObjectId(attributes.recruiterId);

    // Build the job application document
    const jobApplication = new jobApplicationModel({
        ...attributes,
        jobId,
        candidateId,
        recruiterId
    });

    return jobApplication;
};


const jobApplicationModel = mongoose.model<IJobApplicationDocument, jobApplicationModel>(
	"jobApplication",
	jobApplicationSchema
);

export { jobApplicationModel };
