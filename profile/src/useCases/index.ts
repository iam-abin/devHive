import {
    createCandidateProfileUseCase,
	updateCandidateProfileUseCase,
	uploadResumeUseCase,
	getCandidateProfileByIdUseCase,
	getCandidateProfileByEmailUseCase,
	uploadCandidateProfilePicUseCase,
} from "./candidate";

import {
	createRecruiterProfileUseCase,
	updateRecruiterProfileUseCase,
	getRecruiterProfileByIdUseCase,
	getRecruiterProfileByEmailUseCase,
	getCandidateProfileByRecruiterUseCase,
	uploadRecruiterProfilePicUseCase,
} from "./recruiter";


export default {
    createCandidateProfileUseCase,
	updateCandidateProfileUseCase,
	uploadResumeUseCase,
	getCandidateProfileByIdUseCase,
	getCandidateProfileByEmailUseCase,
	uploadCandidateProfilePicUseCase,

	createRecruiterProfileUseCase,
	updateRecruiterProfileUseCase,
	getRecruiterProfileByIdUseCase,
	getRecruiterProfileByEmailUseCase,
	getCandidateProfileByRecruiterUseCase,
	uploadRecruiterProfilePicUseCase,
};
