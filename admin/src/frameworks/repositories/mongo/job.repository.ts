import { JobDocument, JobModel } from '../../database/models';
import { IJob } from '../../types/job';

export = {
    createJob: async (jobData: IJob): Promise<JobDocument> => {
        const jobObject = JobModel.buildJob(jobData);
        return await jobObject.save();
    },

    blockUnblock: async (jobId: string): Promise<JobDocument> => {
        const job = await JobModel.findById(jobId);
        if (!job) throw new Error('job not found');

        job.isActive = !job.isActive;

        return await job.save();
    },

    updateJob: async (jobId: string, data: Partial<IJob>): Promise<JobDocument | null> => {
        const updatedJob = await JobModel.findOneAndUpdate({ jobId: jobId }, { $set: data }, { new: true });

        return updatedJob;
    },

    getById: async (jobId: string): Promise<JobDocument | null> => {
        return await JobModel.findById(jobId);
    },

    deleteJob: async (jobId: string): Promise<JobDocument | null> => {
        const deletedJob = await JobModel.findByIdAndUpdate(
            jobId,
            { $set: { isDeleted: true } },
            {
                new: true,
            },
        );
        return deletedJob;
    },

    getAllJobs: async (skip: number, limit: number): Promise<JobDocument[] | []> => {
        return await JobModel.find({}).skip(skip).limit(limit);
    },

    getCountOfJobs: async (): Promise<number> => {
        return await JobModel.countDocuments();
    },
};
