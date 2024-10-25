import Models from "../../database/mongo/models";
import { IJobDocument } from "../../database/mongo/models/job";
import { IJob } from "../../types/job";

const { JobModel } = Models;

export = {
    createJob: async (jobData: IJob): Promise<IJobDocument> => {
        const newJob = JobModel.buildJob(jobData);
        return await newJob.save();
    },

    deleteJob: async (jobId: string) => {
        const deletedJob = await JobModel.findByIdAndDelete(jobId);
        return deletedJob;
    },

    updateJob: async (jobId: string, data: Partial<IJob>): Promise<IJobDocument | null> => {
        const updatedJob = await JobModel.findByIdAndUpdate(
            jobId,
            { $set: data },
            { new: true }
        );

        return updatedJob;
    },

    changeClosejobStatus: async (jobId: string): Promise<IJobDocument | null>  => {
        const job: IJobDocument | null = await JobModel.findById(jobId);
        if (job) {
            job.isActive = !job?.isActive; // Toggle the boolean field
            return await job.save();
        }

        return job;
    },

    filterJob: async (jobFilterData: object): Promise<IJobDocument[] | []> => {
        const filteredJobs = await JobModel.find(jobFilterData);
        return filteredJobs;
    },

    getAllJobs: async (
        skip: number,
        limit: number,
        applicationJobIds?: string[]
    ): Promise<IJobDocument[] | []> => {
        let jobs;
        // console.log("applicationJobIds ",applicationJobIds);
        
        if (applicationJobIds) {
            jobs = await JobModel.find({ _id: { $nin: applicationJobIds } })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
        } else {
            jobs = await JobModel.find({isActive: true})
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
        }

        return jobs;
    },

    getCountOfJobs: async (applicationJobIds?: string[]): Promise<number> => {
        let totalJobs;
        if (applicationJobIds) {
            totalJobs = await JobModel.countDocuments({
                _id: { $nin: applicationJobIds },
                isActive: true
            });
        } else {
            totalJobs = await JobModel.countDocuments();
        }

        return totalJobs;
    },

    getAllJobsDistinctValues: async (fields: Array<string>): Promise<any> => {
        // Get distinct values for the specified fields
        const distinctValues: any = {};
        for (const field of fields) {
            distinctValues[field] = await JobModel.distinct(field);
        }

        return distinctValues;
    },

    getAllJobsByRecruiterId: async (id: string): Promise<IJobDocument[] | []> => {
        const jobs = await JobModel.find({ recruiterId: id }).sort({
            createdAt: -1,
        });

        return jobs;
    },

    numberOfCreatedJobsByMe: async (id: string): Promise<number> => {
        const jobs = await JobModel.countDocuments({ recruiterId: id });

        return jobs;
    },

    getSearchResults: async (
        searchKey: string,
        skip: number,
        limit: number
    ): Promise<IJobDocument[] | []> => {
        const searchedJobs: any = await JobModel.find({
            jobTitle: { $regex: new RegExp(searchKey, "i") },
        })
            .skip(skip)
            .limit(limit);

        return searchedJobs;
    },

    getCountOfSearchResults: async (searchKey: string): Promise<number> => {
        const searchedJobsCount: number = await JobModel.countDocuments({
            jobTitle: { $regex: new RegExp(searchKey, "i") },
        })

        return searchedJobsCount;
    },

    getAJob: async (jobId: string): Promise<IJobDocument | null> => {
        const job = await JobModel.findById(jobId).populate({
            path: "recruiterId",
            model: "User", // Assuming your User model is named 'User'
        });

        return job;
    },
};
