// import { BASE_URL } from "../baseUrl";

const ADMIN_AUTH_URL = `/auth/admin`;
const CANDIDATE_AUTH_URL = `/auth/candidate`;
const RECRUITER_AUTH_URL = `/auth/recruiter`;
const OTP_AUTH_URL = `/auth/otp`;

const authApiUrlConfig = {
	// Admin
	signinAdminUrl: `${ADMIN_AUTH_URL}/signin`,
	signoutAdminUrl: `${ADMIN_AUTH_URL}/signout`,

	// Candidate
	signinCandidateUrl: `${CANDIDATE_AUTH_URL}/signin`,
	signupCandidateUrl: `${CANDIDATE_AUTH_URL}/signup`,
	verifySignupOtpCandidateUrl: `${CANDIDATE_AUTH_URL}/verifyEmail`,

	passwordResetMobileCandidateUrl: `${CANDIDATE_AUTH_URL}/sendOtp`,
	verifyResetPasswordOtpCandidateUrl: `${CANDIDATE_AUTH_URL}/verifyOtp`,
	resetPasswordCandidateUrl: `${CANDIDATE_AUTH_URL}/resetPassword`,

	forgotPasswordEmailCandidateUrl: `${OTP_AUTH_URL}/sendOtp`,
	verifyForgotPasswordOtpCandidateUrl: `${OTP_AUTH_URL}/verify-forgotPassword-otp`,
	forgotPasswordCandidateUrl: `${CANDIDATE_AUTH_URL}/forgotPassword`,

	signoutCandidateUrl: `${CANDIDATE_AUTH_URL}/signout`,

	// Recruiter
	signinRecruiterUrl: `${RECRUITER_AUTH_URL}/signin`,
	signupRecruiterUrl: `${RECRUITER_AUTH_URL}/signup`,
	verifySignupOtpRecruiterUrl: `${RECRUITER_AUTH_URL}/verifyEmail`,

	passwordResetMobileRecruiterUrl: `${RECRUITER_AUTH_URL}/sendOtp`,
	verifyResetPasswordOtpRecruiterUrl: `${RECRUITER_AUTH_URL}/verifyOtp`,
	resetPasswordRecruiterUrl: `${RECRUITER_AUTH_URL}/resetPassword`,

	forgotPasswordEmailRecruiterUrl: `${OTP_AUTH_URL}/sendOtp`,
	verifyForgotPasswordOtpRecruiterUrl: `${OTP_AUTH_URL}/verify-forgotPassword-otp`,
	forgotPasswordRecruiterUrl: `${RECRUITER_AUTH_URL}/forgotPassword`,

	signoutRecruiterUrl: `${RECRUITER_AUTH_URL}/signout`,
};

export default authApiUrlConfig;
