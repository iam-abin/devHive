import { IJobDocument, JobModel } from "../../database/models";
import { IJob } from "../../types/job-interface";

// we want to export some closure
export = {
	// these fn's are returning a promise as async so we can define return type as Promise<ICandidateData>

	createJob: async (jobData: IJob): Promise<IJobDocument> => {
		const jobObject = JobModel.buildJob(jobData);
		return await jobObject.save();
	},

	blockUnblock: async (jobId: string): Promise<IJobDocument> => {
		const job = await JobModel.findById(jobId);
		if (!job) throw new Error("job not found");

		job.isActive = !job.isActive;

		return await job.save();
	},

	updateJob: async (jobId: string, data: Partial<IJob>): Promise<IJobDocument | null> => {
		const updatedJob = await JobModel.findOneAndUpdate(
			{ jobId: jobId },
			{ $set: data },
			{ new: true }
		);

		return updatedJob;
	},

	getById: async (jobId: string): Promise<IJobDocument | null> => {
		const job = await JobModel.findById(jobId);
		return job;
	},

	getAllJobs: async (): Promise<IJobDocument[] | []> => {
		const jobs = await JobModel.find({});
		return jobs;
	},

	deleteJob: async (jobId: string): Promise<IJobDocument | null> => {
		const deletedJob = await JobModel.findByIdAndDelete(jobId, {new: true});
		return deletedJob;
	},

	numberOfJobs: async (): Promise<number> => {
		const totalJobs = await JobModel.countDocuments();
		return totalJobs;
	},
};

// export default repository();
