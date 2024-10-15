import {
	applyJobUseCase,
	getAllAppliedJobsUseCase,
	getNumberofCandidateAppliedJobsUseCase,
} from "./candidate";

import {
	filterJobUseCase,
	getAllJobsUseCase,
	getJobByIdUseCase,
	getNumberofJobsUseCase,
	getAllJobFieldsDistinctValuesUseCase,
	getSearchResultUseCase,
	// getSearchResultCountUseCase,

} from "./job";

import {
	createJobUseCase,
	updateJobUseCase,
	deleteJobUseCase,
	getAllJobApplicationsUseCase,
	updateJobApplicationStatusUseCase,
	getRecruiterCreatedJobsUseCase,
	getAJobApplicationUseCase,
	changeJobApplicationStatusUseCase,
	changeClosejobStatusUseCase,
	recruiterDashboardCardsDetailsUseCase,
	recruiterDashboardGraphDetailsUseCase,
} from "./recruiter";

export default {
	applyJobUseCase,
	getAllAppliedJobsUseCase,
	getNumberofCandidateAppliedJobsUseCase,

	filterJobUseCase,
	getAllJobsUseCase,
	getJobByIdUseCase,
	getNumberofJobsUseCase,
	getAllJobFieldsDistinctValuesUseCase,
	getSearchResultUseCase,
	// getSearchResultCountUseCase,

	createJobUseCase,
	updateJobUseCase,
	deleteJobUseCase,
	getAllJobApplicationsUseCase,
	updateJobApplicationStatusUseCase,
	getRecruiterCreatedJobsUseCase,
	getAJobApplicationUseCase,
	changeJobApplicationStatusUseCase,
	changeClosejobStatusUseCase,
	recruiterDashboardCardsDetailsUseCase,
	recruiterDashboardGraphDetailsUseCase,
};
