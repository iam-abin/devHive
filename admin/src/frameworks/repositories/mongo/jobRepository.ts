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
		const userObject = new JobModel(jobData);
		return await userObject.save();
	},

	blockUnblock: async ({ id }: blockUnBlockInterface) => {
		const job = await JobModel.findById(id);
		if (!job) {
			throw new Error("recruiter not found");
		}

		job.blocked = !job.blocked;

		return await job.save();
	},

	getById: async (id: string) => {
		const job = await JobModel.findById(id);
		return job;
	},

	getAllJobs: async () => {
		const jobs = await JobModel.find({});
		return jobs;
	},
};

// export default repository();
