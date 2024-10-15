import Models from "../../database/mongo/models";

const { JobModel } = Models;

export = {
    createJob: async (jobData: any) => {
        const newJob = JobModel.buildJob(jobData);
        return await newJob.save();
    },

    deleteJob: async (jobId: string) => {
        const deletedJob = await JobModel.deleteOne({ _id: jobId });
        return deletedJob;
    },

    updateJob: async (jobId: string, data: object) => {
        const updatedJob = await JobModel.findOneAndUpdate(
            { _id: jobId },
            { $set: data },
            { new: true }
        );

        return updatedJob;
    },

    changeClosejobStatus: async (jobId: string) => {
        const job: any = await JobModel.findById(jobId);
        if (job) {
            job.isClosed = !job?.isClosed; // Toggle the boolean field
            const updatedJob = await job.save();

            return updatedJob;
        }

        return job;
    },

    filterJob: async (jobFilterData: object) => {
        const filteredJobs = await JobModel.find(jobFilterData);
        return filteredJobs;
    },

    getAllJobs: async (
        skip: number,
        limit: number,
        applicationJobIds?: string[]
    ): Promise<any[]> => {
        let jobs;
        if (applicationJobIds) {
            jobs = await JobModel.find({ _id: { $nin: applicationJobIds } })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
        } else {
            jobs = await JobModel.find()
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

    getAllJobsByRecruiterId: async (id: string): Promise<any[]> => {
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
    ): Promise<any> => {
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

    getAJob: async (id: string) => {
        const job = await JobModel.findById(id).populate({
            path: "recruiterId",
            model: "User", // Assuming your User model is named 'User'
        });

        return job;
    },
};
