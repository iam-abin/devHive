import Models from "../../database/mongo/models";
import { IJobApplicationDocument } from "../../database/mongo/models/jobApplication";
import { IJobApplication } from "../../types/jobApplication";

const { jobApplicationModel } = Models;

export = {
    applyJob: async (
        data: IJobApplication
    ): Promise<IJobApplicationDocument> => {
        const newApplication = await jobApplicationModel.create(data);
        return newApplication;
    },

    getAJobApplication: async (
        applicationId: string
    ): Promise<IJobApplicationDocument | null> => {
        const application = await jobApplicationModel
            .findById(applicationId)
            .populate("jobId");
        return application;
    },

    getAllAppliedJobsByCandidateId: async (
        candidateId: string,
        skip: number,
        limit: number
    ): Promise<IJobApplicationDocument[] | []> => {
        // use populate
        const appliedJobs = await jobApplicationModel
            .find({ candidateId })
            .populate("jobId", [
                "_id",
                "title",
                "companyLocation",
                "salaryMax",
                "employmentType",
                "createdAt",
            ])
            .select("jobId")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return appliedJobs;
    },

    getAllJobApplicationsByUserId: async (
        recruiterId: string,
        candidateId: string,
        skip: number,
        limit: number
    ) => {
        // use populate
        // const jobApplications = await jobApplicationModel.find({},{recruiterId:id});
        let jobApplications;
        if (recruiterId) {
            jobApplications = await jobApplicationModel
                .find({ recruiterId })
                .skip(skip)
                .limit(limit)
                .populate("jobId", ["title"])
                .populate("candidateId", ["name", "email"]);
        } else {
            jobApplications = await jobApplicationModel
                .find({ candidateId })
                .skip(skip)
                .limit(limit)
                .populate("jobId")
                .populate("candidateId");
        }

        return jobApplications;
    },

    updateJobApplicationStatus: async (id: string, status: object) => {
        const updatedJob = await jobApplicationModel.findOneAndUpdate(
            { _id: id },
            { $set: status },
            { new: true }
        );
        return updatedJob;
    },

    getAJobApplicationByRecruiter: async (jobApplicationId: string) => {
        const jobApplications = await jobApplicationModel
            .findOne({ _id: jobApplicationId })
            .populate("jobId")
            .populate("candidateId")
            .populate("recruiterId");

        return jobApplications;
    },

    getAnAppliedJobByCandidate: async (
        candidateId: string,
        jobApplicationId: string
    ) => {
        const jobApplication = await jobApplicationModel
            .findOne({ jobId: jobApplicationId, candidateId })
            .populate("jobId")
            .populate("recruiterId");

        return jobApplication;
    },

    changeJobApplicationStatus: async (
        jobApplicationId: string,
        applicationStatus: string
    ) => {
        const jobApplications = await jobApplicationModel.findOneAndUpdate(
            { _id: jobApplicationId },
            {
                $set: { applicationStatus },
            },
            { new: true }
        );

        return jobApplications;
    },
    
    getCountOfAppliedJobs: async (
        candidateId: string
    ): Promise<number> => {
        const totalJobs: number = await jobApplicationModel.countDocuments({
            candidateId
        });

        return totalJobs;
    },

    getCountOfApplications: async (
        recruiterId: string,
    ): Promise<number> => {
        const totalJobs: number = await jobApplicationModel.countDocuments({
            recruiterId
        });

        return totalJobs;
    },

    getCountOfApplicationsStatus: async (
        recruiterId: string,
        applicationStatus: string
    ): Promise<number> => {
        const totalJobs: number = await jobApplicationModel.countDocuments({
            recruiterId,
            applicationStatus,
        });

        return totalJobs;
    },
};
