import {
	blockUnblockCandidateUseCase,
	getAllCandidatesUseCase,
	getCandidateProfileByuserIdUseCase,
} from "./candidate";

import {
	blockUnblockRecruiterUseCase,
	getAllRecruitersUseCase,
	getRecruiterProfileByuserIdUseCase,
} from "./recruiter";

import {
	blockUnblockJobUseCase,
	getAllJobsUseCase,
	getJobByIdUseCase,
} from "./job";

import {
	blockUnblockCompanyUseCase,
	getAllCompaniesUseCase,
	getCompanyByIdUseCase,
} from "./company";

import { getAllDashboardCardsDetailsUseCase } from "./dashboard";

export default {
	blockUnblockCandidateUseCase,
	getAllCandidatesUseCase,
	getCandidateProfileByuserIdUseCase,

	blockUnblockRecruiterUseCase,
	getAllRecruitersUseCase,
	getRecruiterProfileByuserIdUseCase,

	blockUnblockJobUseCase,
	getAllJobsUseCase,
	getJobByIdUseCase,

	blockUnblockCompanyUseCase,
	getAllCompaniesUseCase,
	getCompanyByIdUseCase,

	getAllDashboardCardsDetailsUseCase,
};
