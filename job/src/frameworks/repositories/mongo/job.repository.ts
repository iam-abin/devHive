import Models from '../../database/mongo/models';
import { IJobDocument } from '../../database/mongo/models/job';
import { IFilter, IJob } from '../../types/job';

const { JobModel } = Models;

const JOBS_SELECT_FIELDS: string[] = [
    'title',
    'companyLocation',
    'employmentType',
    'salaryMax',
    'isActive',
    'createdAt',
];

export = {
    createJob: async (jobData: IJob): Promise<IJobDocument> => {
        const newJob = JobModel.buildJob(jobData);
        return await newJob.save();
    },

    deleteJob: async (jobId: string) => {
        const deletedJob = await JobModel.findByIdAndUpdate(
            jobId,
            { $set: { isDeleted: true } },
            { new: true },
        );
        return deletedJob;
    },

    updateJob: async (jobId: string, data: Partial<IJob>): Promise<IJobDocument | null> => {
        const updatedJob = await JobModel.findByIdAndUpdate(jobId, { $set: data }, { new: true });
        return updatedJob;
    },

    changeClosejobStatus: async (jobId: string): Promise<IJobDocument | null> => {
        const job: IJobDocument | null = await JobModel.findById(jobId);
        if (job) {
            job.isActive = !job?.isActive; // Toggle the boolean field
            return await job.save();
        }

        return job;
    },

    filterJobs: async (jobFilterData: IFilter, skip: number, limit: number): Promise<IJobDocument[] | []> => {
        const filteredJobs = await JobModel.find({...jobFilterData, isDeleted: false})
            .skip(skip)
            .limit(limit)
            .select(JOBS_SELECT_FIELDS);
        return filteredJobs;
    },

    getCountOfFilterdJobs: async (jobFilterData: IFilter): Promise<number> => {
        return await JobModel.countDocuments({...jobFilterData, isDeleted: false});
    },

    getAllJobs: async (
        skip: number,
        limit: number,
        applicationJobIds?: string[],
    ): Promise<Partial<IJobDocument>[] | []> => {
        let jobs: Partial<IJobDocument>[] | [];
        if (applicationJobIds) {
            jobs = await JobModel.find({ _id: { $nin: applicationJobIds }, isDeleted: false })
                .select(JOBS_SELECT_FIELDS)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
        } else {
            jobs = await JobModel.find({ isActive: true })
                .select(JOBS_SELECT_FIELDS)
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
                isDeleted: false,
                isActive: true,
            });
        } else {
            totalJobs = await JobModel.countDocuments();
        }

        return totalJobs;
    },

    getAllJobsDistinctValues: async (fields: string[]): Promise<Record<string, string[]>> => {
        // Get distinct values for the specified fields
        const distinctValues: Record<string, string[]> = {};
        for (const field of fields) {
            distinctValues[field] = await JobModel.distinct(field);
        }

        return distinctValues;
    },

    getAllJobsByRecruiterId: async (recruiterId: string): Promise<IJobDocument[] | []> => {
        return await JobModel.find({ recruiterId, isDeleted: false }).sort({
            createdAt: -1,
        });
    },

    getCountOfCreatedJobs: async (recruiterId: string): Promise<number> => {
        return await JobModel.countDocuments({ recruiterId, isDeleted: false });
    },

    searchJob: async (
        searchKey: string,
        skip: number,
        limit: number,
    ): Promise<IJobDocument[] | []> => {
        console.log(searchKey, skip, limit);
        
        const searchedJobs: IJobDocument[] | [] = await JobModel.find({
            title: { $regex: new RegExp(searchKey, 'i') },
            isDeleted: false,
        })
            .skip(skip)
            .limit(limit);

        return searchedJobs;
    },

    searchJobCount: async (searchKey: string): Promise<number> => {
        return await JobModel.countDocuments({
            title: { $regex: new RegExp(searchKey, 'i') },
            isDeleted: false,
        });
    },

    getAJob: async (jobId: string): Promise<IJobDocument | null> => {
        return await JobModel.findById(jobId, { isDeleted: false }).populate({
            path: 'recruiterId',
            model: 'User', // Assuming your User model is named 'User'
        });
    },
};
