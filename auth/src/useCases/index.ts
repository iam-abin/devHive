import {
	candidateSignupUseCase,
	getCandidateByEmailUseCase,
	updateCandidatePasswordUseCase,
} from "./candidate";

import {
	recruiterSignupUseCase,
	getRecruiterByEmailUseCase,
	updateRecruiterPasswordUseCase,
} from "./recruiter";

import { getAdminByEmailUseCase } from "./admin";

export default {
	candidateSignupUseCase,
	getCandidateByEmailUseCase,
	updateCandidatePasswordUseCase,

	recruiterSignupUseCase,
	getRecruiterByEmailUseCase,
	updateRecruiterPasswordUseCase,

	getAdminByEmailUseCase,
};
