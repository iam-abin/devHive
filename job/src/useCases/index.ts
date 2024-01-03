import { applyJobUseCase, getAllAppliedJobsUseCase, getNumberofCandidateAppliedJobsUseCase } from "./candidate";

import { filterJobUseCase, getAllJobsUseCase, getJobByIdUseCase, getNumberofJobsUseCase } from "./job";

import {
	createJobUseCase,
	updateJobUseCase,
	deleteJobUseCase,
	getAllJobApplicationsUseCase,
	updateJobApplicationStatusUseCase,
	getRecruiterCreatedJobsUseCase,
	getAJobApplicationUseCase,
	changeJobApplicationStatusUseCase
} from "./recruiter";

export default {
	applyJobUseCase,
	getAllAppliedJobsUseCase,
	getNumberofCandidateAppliedJobsUseCase,

	filterJobUseCase,
	getAllJobsUseCase,
	getJobByIdUseCase,
	getNumberofJobsUseCase,

	createJobUseCase,
	updateJobUseCase,
	deleteJobUseCase,
	getAllJobApplicationsUseCase,
	updateJobApplicationStatusUseCase,
	getRecruiterCreatedJobsUseCase,
	getAJobApplicationUseCase,
	changeJobApplicationStatusUseCase
};
