import { applyJobUseCase, getAllAppliedJobsUseCase, getNumberofCandidateAppliedJobsUseCase, getAnAppliedJobUseCase } from "./candidate";

import { filterJobUseCase, getAllJobsUseCase, getJobByIdUseCase, getNumberofJobsUseCase, getAllJobFieldsDistinctValuesUseCase } from "./job";

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
	getAnAppliedJobUseCase,

	filterJobUseCase,
	getAllJobsUseCase,
	getJobByIdUseCase,
	getNumberofJobsUseCase,
	getAllJobFieldsDistinctValuesUseCase,

	createJobUseCase,
	updateJobUseCase,
	deleteJobUseCase,
	getAllJobApplicationsUseCase,
	updateJobApplicationStatusUseCase,
	getRecruiterCreatedJobsUseCase,
	getAJobApplicationUseCase,
	changeJobApplicationStatusUseCase
};
