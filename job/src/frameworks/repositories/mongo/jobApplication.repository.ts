import Models from '../../database/mongo/models';
import { IJobApplicationDocument } from '../../database/mongo/models/jobApplication';
import { IJobApplication } from '../../types/jobApplication';

const { jobApplicationModel } = Models;

const APPLIED_JOBS_SELECT_FIELDS: string[] = [
    '_id',
    'title',
    'companyLocation',
    'salaryMax',
    'employmentType',
    'createdAt',
];

export = {
    applyJob: async (data: IJobApplication): Promise<IJobApplicationDocument> => {
        const newApplication = await jobApplicationModel.create(data);
        return newApplication;
    },

    getAJobApplication: async (applicationId: string): Promise<IJobApplicationDocument | null> => {
        const application = await jobApplicationModel
            .findById(applicationId)
            .populate('jobId')
            .populate('candidateId', ['name', 'email']);
        return application;
    },

    getAllAppliedJobsByCandidateId: async (
        candidateId: string,
        skip: number,
        limit: number,
    ): Promise<IJobApplicationDocument[] | []> => {
        const appliedJobs = await jobApplicationModel
            .find({ candidateId })
            .populate('jobId', APPLIED_JOBS_SELECT_FIELDS)
            .select('jobId')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return appliedJobs;
    },

    getCountOfAppliedJobs: async (candidateId: string): Promise<number> => {
        const totalJobs: number = await jobApplicationModel.countDocuments({
            candidateId,
        });

        return totalJobs;
    },

    getAllJobApplicationsByUserId: async (
        recruiterId: string,
        candidateId: string,
        skip: number,
        limit: number,
    ) => {
        let jobApplications;
        if (recruiterId) {
            jobApplications = await jobApplicationModel
                .find({ recruiterId })
                .skip(skip)
                .limit(limit)
                .populate('jobId', ['title'])
                .populate('candidateId', ['name', 'email']);
        } else {
            jobApplications = await jobApplicationModel
                .find({ candidateId })
                .skip(skip)
                .limit(limit)
                .populate('jobId')
                .populate('candidateId');
        }

        return jobApplications;
    },

    getCountOfApplications: async (recruiterId: string): Promise<number> => {
        const totalJobs: number = await jobApplicationModel.countDocuments({
            recruiterId,
        });

        return totalJobs;
    },

    updateJobApplicationStatus: async (id: string, status: object) => {
        const updatedJob = await jobApplicationModel.findOneAndUpdate(
            { _id: id },
            { $set: status },
            { new: true },
        );
        return updatedJob;
    },

    getAJobApplicationByRecruiter: async (jobApplicationId: string) => {
        const jobApplications = await jobApplicationModel
            .findOne({ _id: jobApplicationId })
            .populate('jobId')
            .populate('candidateId')
            .populate('recruiterId');

        return jobApplications;
    },

    getAnAppliedJobByCandidate: async (candidateId: string, jobApplicationId: string) => {
        const jobApplication = await jobApplicationModel
            .findOne({ jobId: jobApplicationId, candidateId })
            .populate('jobId')
            .populate('recruiterId');

        return jobApplication;
    },

    changeJobApplicationStatus: async (jobApplicationId: string, applicationStatus: string) => {
        const jobApplications = await jobApplicationModel.findOneAndUpdate(
            { _id: jobApplicationId },
            {
                $set: { applicationStatus },
            },
            { new: true },
        );

        return jobApplications;
    },

    getCountOfApplicationsStatus: async (recruiterId: string, applicationStatus: string): Promise<number> => {
        const totalJobs: number = await jobApplicationModel.countDocuments({
            recruiterId,
            applicationStatus,
        });

        return totalJobs;
    },

    searchAppliedJobs: async (
        searchKey: string,
        skip: number,
        limit: number,
    ): Promise<IJobApplicationDocument[] | []> => {
        
        const searchedJobs: IJobApplicationDocument[] | [] = await jobApplicationModel
            .aggregate([
                {
                    $lookup: {
                        from: 'jobs',
                        foreignField: '_id',
                        localField: 'jobId',
                        as: 'jobDetails',
                    },
                },
                {
                    $unwind: '$jobDetails', // Unwind to access individual job fields
                },

                {
                    $match: {
                        'jobDetails.title': { $regex: searchKey, $options: 'i' }, // Case-insensitive regex match
                    },
                },
                {
                    $project: {
                        jobId: 1,
                        candidateId: 1,
                        recruiterId: 1,
                        applicationStatus: 1,
                        'jobDetails.title': 1, // Include the title from Job details
                    },
                },
                // {
                //     $match: {
                //         title: {
                //             $regex: new RegExp(searchKey, 'i'),
                //         },
                //     },
                // },
            ])
            .skip(skip)
            .limit(limit);
        return searchedJobs;
    },

    searchAppliedJobsCount: async (searchKey: string): Promise<number> => {
        return await jobApplicationModel.countDocuments({
            title: { $regex: new RegExp(searchKey, 'i') },
            isDeleted: false,
        });
    },
};
