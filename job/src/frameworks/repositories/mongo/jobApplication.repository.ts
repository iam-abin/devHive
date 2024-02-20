import schemas from "../../database/mongo/models";

const { JobModel, jobApplicationModel, UserModel } = schemas;

export = {
	applyJob: async (data: object) => {
		const newApplication = await jobApplicationModel.create(data);
		console.log("in applyJob repository");

		return newApplication;
	},

	getAJobApplication: async (id: string, data: object) => {
		console.log(
			".................................................................."
		);

		const applicationExists = await jobApplicationModel.findOne({
			_id: id,
		});

		// console.log("inside get A JobApplication ============");
		// console.log(applicationExists);

		// console.log("inside get A JobApplication ============");

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
		console.log(appliedJobs);
		return appliedJobs;
	},

	getCountOfCandidateAppliedJobs: async (id: string): Promise<number> => {
		const totalJobs: number = await jobApplicationModel.countDocuments({
			candidateId: id,
		});
		console.log(totalJobs);
		return totalJobs;
	},

	getAllJobApplicationsByRecruiterId: async (id: string) => {
		// use populate
		// const jobApplications = await jobApplicationModel.find({},{recruiterId:id});
		const jobApplications = await jobApplicationModel
			.find({ recruiterId: id })
			.populate({ path: "jobId", model: JobModel })
			.populate({ path: "candidateId", model: UserModel });
		console.log("in getAllJobApplicationsByRecruiterId", jobApplications);

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
		// use populate
		const jobApplications = await jobApplicationModel
			.findOne({ _id: jobApplicationId })
			.populate({ path: "jobId", model: JobModel })
			.populate({ path: "candidateId", model: UserModel })
			.populate({ path: "recruiterId", model: UserModel });
		console.log("in getAllJobApplicationsByRecruiterId", jobApplications);

		return jobApplications;
	},

	getAnAppliedJobByCandidate: async (
		candidateId: string,
		jobApplicationId: string
	) => {
		// use populate
		console.log(
			"in getAnAppliedJobByCandidate1 jobApplicationId",
			jobApplicationId
		);
		console.log("in getAnAppliedJobByCandidate1 candidateId", candidateId);

		const jobApplication = await jobApplicationModel
			.findOne({ jobId: jobApplicationId, candidateId })
			.populate({ path: "jobId", model: JobModel })
			.populate({ path: "recruiterId", model: UserModel });
		console.log("in getAnAppliedJobByCandidate2", jobApplication);

		return jobApplication;
	},

	changeJobApplicationStatus: async (
		jobApplicationId: string,
		applicationStatus: string
	) => {
		// use populate
		const jobApplications = await jobApplicationModel.findOneAndUpdate(
			{ _id: jobApplicationId },
			{
				$set: {
					applicationStatus: applicationStatus,
				},
			},
			{ new: true }
		);
		console.log("in getAllJobApplicationsByRecruiterId", jobApplications);

		return jobApplications;
	},
};
