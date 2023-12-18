import schemas from "../../database/models"
import { blockUnBlockInterface } from "../../types/candidateInterface";

const { JobModel } = schemas;

// we want to export some closure
export = {

	 // these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

	 createJob: async (jobData: any) => {
		console.log("inside createJob fn in admin service", jobData);
		
		// const {name, email, phone, userType, isActive} = jobData
		// const userObject = new JobModel({name, email, phone, userType, isActive});
		// const userObject = new JobModel(jobData);
		// return await userObject.save();

		const jobObject = JobModel.buildJob(jobData);
		return await jobObject.save();
	},

	blockUnblock: async ({ id }: blockUnBlockInterface) => {
		const job = await JobModel.findOne({jobId:id});
		if (!job) {
			throw new Error("job not found");
		}

		job.blocked = !job.blocked;

		return await job.save();
	},

	updateJob: async (id: string, data: object)=>{
        console.log("in updateJob repository id", id, " data ", data);
        
        const updatedJob = await JobModel.findOneAndUpdate({ "jobId": id }, { $set: data }, {new: true});
        console.log("in updateJob repository after update", updatedJob);
		return updatedJob;
    },

	getById: async (jobId: string) => {
		const job = await JobModel.findOne({jobId});
		return job;
	},

	getAllJobs: async () => {
		const jobs = await JobModel.find({});
		return jobs;
	},

	deleteJob: async (jobId: string)=>{
		console.log("in delete job admin");
		
        const deletedJob = await JobModel.deleteOne({jobId: jobId});
        console.log("deletedJob: ",deletedJob);
        return deletedJob
    },
};

// export default repository();
