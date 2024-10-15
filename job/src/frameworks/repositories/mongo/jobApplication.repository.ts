import { IJobApplication } from "../../../entities/job-applications";
import Models from "../../database/mongo/models";

const { JobModel, jobApplicationModel, UserModel } = Models;

export = {
	applyJob: async (data: IJobApplication) => {
		const newApplication = await jobApplicationModel.create(data);
		
		return newApplication;
	},

	getAJobApplication: async (id: string, data: object) => {
		
		const applicationExists = await jobApplicationModel.findOne({
			_id: id,
		});
		
		return applicationExists;
	},

	getAllAppliedJobsByCandidateId: async (
		id: string,
		skip: number,
		limit: number
	) => {
		// use populate
		const appliedJobs = await jobApplicationModel
			.find({ candidateId: id })
			.populate({ path: "jobId", model: JobModel })
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);
			
		return appliedJobs;
	},

	getCountOfCandidateAppliedJobs: async (id: string): Promise<number> => {
		const totalJobs: number = await jobApplicationModel.countDocuments({
			candidateId: id,
		});
		
		return totalJobs;
	},

	getAllJobApplicationsByRecruiterId: async (
		recruiterId: string,
		candidateId: string
	) => {
		// use populate
		// const jobApplications = await jobApplicationModel.find({},{recruiterId:id});
		let jobApplications;
		if (recruiterId) {
			jobApplications = await jobApplicationModel
				.find({ recruiterId: recruiterId })
				.populate({ path: "jobId", model: JobModel })
				.populate({ path: "candidateId", model: UserModel });
				
		} else {
			jobApplications = await jobApplicationModel
				.find({ candidateId: candidateId })
				.populate({ path: "jobId", model: JobModel })
				.populate({ path: "candidateId", model: UserModel });
				
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
			.populate({ path: "jobId", model: JobModel })
			.populate({ path: "candidateId", model: UserModel })
			.populate({ path: "recruiterId", model: UserModel });
			
		return jobApplications;
	},

	getAnAppliedJobByCandidate: async (
		candidateId: string,
		jobApplicationId: string
	) => {
		
		const jobApplication = await jobApplicationModel
			.findOne({ jobId: jobApplicationId, candidateId })
			.populate({ path: "jobId", model: JobModel })
			.populate({ path: "recruiterId", model: UserModel });
			
		return jobApplication;
	},

	changeJobApplicationStatus: async (
		jobApplicationId: string,
		applicationStatus: string
	) => {
		
		const jobApplications = await jobApplicationModel.findOneAndUpdate(
			{ _id: jobApplicationId },
			{
				$set: {
					applicationStatus: applicationStatus,
				},
			},
			{ new: true }
		);
		
		return jobApplications;
	},

	numberOfJobApplicationsToMe: async (id: string): Promise<number> => {
		const totalJobs: number = await jobApplicationModel.countDocuments({
			recruiterId: id,
		});
		
		return totalJobs;
	},

	numberOfAppliedStatusCount: async (recruiterId: string) => {
		const totalJobs: number = await jobApplicationModel.countDocuments({
			recruiterId: recruiterId,
			applicationStatus: "Applied",
		});
		
		return totalJobs;
	},
	numberOfShortlistedStatusCount: async (recruiterId: string) => {
		const totalJobs: number = await jobApplicationModel.countDocuments({
			recruiterId: recruiterId,
			applicationStatus: "Shortlisted",
		});
		
		return totalJobs;
	},
	numberOfRejectedStatusCount: async (recruiterId: string) => {
		const totalJobs: number = await jobApplicationModel.countDocuments({
			recruiterId: recruiterId,
			applicationStatus: "Rejected",
		});
		
		return totalJobs;
	},
};
