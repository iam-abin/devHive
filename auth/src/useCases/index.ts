import {
	candidateSignupUseCase,
	getCandidateByEmailUseCase,
	updateCandidatePasswordUseCase,
	createEmailVerificationTokenUseCase,
	signupEmailVerificationTokenUseCase,
	getEmailVerifyTokenUseCase
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
	getEmailVerifyTokenUseCase,

	recruiterSignupUseCase,
	getRecruiterByEmailUseCase,
	updateRecruiterPasswordUseCase,

	getAdminByEmailUseCase,
};
