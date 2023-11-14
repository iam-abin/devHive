import {
	candidateSignupUseCase,
	getCandidateByEmailUseCase,
	updateCandidatePasswordUseCase,
	createEmailVerificationTokenUseCase,
	signupEmailVerificationTokenUseCase,
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
	createEmailVerificationTokenUseCase,
	signupEmailVerificationTokenUseCase,

	recruiterSignupUseCase,
	getRecruiterByEmailUseCase,
	updateRecruiterPasswordUseCase,

	getAdminByEmailUseCase,
};
