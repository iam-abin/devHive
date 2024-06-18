import Models from "../../database/models";

const { JobModel } = Models;

// we want to export some closure
export = {
	// these fn's are returning a promise as async so we can define return type as Promise<ICandidateData>

	createJob: async (jobData: any): Promise<any> => {
		const jobObject = JobModel.buildJob(jobData);
		return await jobObject.save();
	},

	blockUnblock: async (jobId: string) => {
		const job = await JobModel.findOne({ jobId });
		if (!job) {
			throw new Error("job not found");
		}

		job.isActive = !job.isActive;

		return await job.save();
	},

	updateJob: async (jobId: string, data: object) => {
		const updatedJob = await JobModel.findOneAndUpdate(
			{ jobId: jobId },
			{ $set: data },
			{ new: true }
		);

		return updatedJob;
	},

	getById: async (jobId: string) => {
		const job = await JobModel.findOne({ jobId });
		return job;
	},

	getAllJobs: async () => {
		const jobs = await JobModel.find({});
		return jobs;
	},

	deleteJob: async (jobId: string) => {
		const deletedJob = await JobModel.deleteOne({ jobId: jobId });
		return deletedJob;
	},

	numberOfJobs: async () => {
		const totalJobs = await JobModel.countDocuments();
		return totalJobs;
	},
};

// export default repository();
