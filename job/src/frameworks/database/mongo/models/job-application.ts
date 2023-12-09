import mongoose from "mongoose";

interface jobApplicationAttributes {
	jobId: string;
	candidateId: string;
	recruiterId: string;
	applicationStatus: string;
}

interface jobApplicationDocument extends mongoose.Document {
	jobId: string;
	candidateId: string;
	recruiterId: string;
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
        default: 'Applied'
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

interface jobApplicationModel extends mongoose.Model<jobApplicationDocument> {
	buildJob(attributes: jobApplicationAttributes): jobApplicationDocument;
}

jobApplicationSchema.statics.buildJob = (attributes: jobApplicationAttributes) => {
	console.log("in build jobApplication attributes", attributes);
	
	return new jobApplicationModel( attributes );
};

const jobApplicationModel = mongoose.model<jobApplicationDocument, jobApplicationModel>(
	"jobApplication",
	jobApplicationSchema
);

export { jobApplicationModel };
