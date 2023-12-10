import { applyJobUseCase, getAllAppliedJobs } from "./candidate";

import { filterJobUseCase, getAllJobsUseCase, getJobByIdUseCase } from "./job";

import {
	createJobUseCase,
	updateJobUseCase,
	deleteJobUseCase,
	getAllJobApplicationsUseCase,
	updateJobApplicationStatusUseCase,
	getRecruiterCreatedJobsUseCase,
} from "./recruiter";

export default {
	applyJobUseCase,
	getAllAppliedJobs,

	filterJobUseCase,
	getAllJobsUseCase,
	getJobByIdUseCase,

	createJobUseCase,
	updateJobUseCase,
	deleteJobUseCase,
	getAllJobApplicationsUseCase,
	updateJobApplicationStatusUseCase,
	getRecruiterCreatedJobsUseCase,
};
