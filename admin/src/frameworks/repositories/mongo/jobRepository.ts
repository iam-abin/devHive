import schemas from "../../database/models";

const { JobModel } = schemas;

// we want to export some closure
export = {
	// these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

	createJob: async (jobData: any): Promise<any> => {
		console.log("inside createJob fn in admin service", jobData);

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
		console.log("in updateJob repository jobId", jobId, " data ", data);

		const updatedJob = await JobModel.findOneAndUpdate(
			{ jobId: jobId },
			{ $set: data },
			{ new: true }
		);
		console.log("in updateJob repository after update", updatedJob);
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
		console.log("in delete job admin");

		const deletedJob = await JobModel.deleteOne({ jobId: jobId });
		console.log("deletedJob: ", deletedJob);
		return deletedJob;
	},
};

// export default repository();
