const JOB_ADMIN_URL = `admin/job`; // job management in admin service
const RECRUITER_ADMIN_URL = `admin/recruiter`; // recruiter management in admin service
const CANDIDATE_ADMIN_URL = `admin/candidate`;
const COMPANY_ADMIN_URL = `admin/company`;
const DASHBOARD_ADMIN_URL = `admin/dashboard`;

const adminApiUrlConfig = {
	// jobs
	getAllJobsUrl: `${JOB_ADMIN_URL}/jobs`,
	blockUnblockJobUrl: (jobId: string) =>
		`${JOB_ADMIN_URL}/blockUnblock/${jobId}`,
	viewJobDetailsUrl: (jobId: string) => `${JOB_ADMIN_URL}/viewJob/${jobId}`,

	// Recruiter
	getAllRecruitersUrl: `${RECRUITER_ADMIN_URL}/recruiters`,
	blockUnblockRecruiterUrl: (userId: string) =>
		`${RECRUITER_ADMIN_URL}/blockUnblock/${userId}`,
	viewRecruiterProfileDetailsUrl: (userId: string) =>
		`${RECRUITER_ADMIN_URL}/viewProfile/${userId}`,

	// Candidate
	getAllCandidatesUrl: `${CANDIDATE_ADMIN_URL}/candidates`,
	blockUnblockCandidateUrl: (userId: string) =>
		`${CANDIDATE_ADMIN_URL}/blockUnblock/${userId}`,
	viewCandidateProfileDetailsUrl: (userId: string) =>
		`${CANDIDATE_ADMIN_URL}/viewProfile/${userId}`,

	// Company
	getAllCompaniesUrl: `${COMPANY_ADMIN_URL}/companies`,
	blockUnblockCompanyUrl: (companyId: string) =>
		`${COMPANY_ADMIN_URL}/company/blockUnblock/${companyId}`,
	// viewCompanyProfileDetailsUrl: (companyId: string) => `${COMPANY_ADMIN_URL}/viewProfile/${companyId}`,

	// dashboard
	getAllCardsDetailsUrl: `${DASHBOARD_ADMIN_URL}/data`,
};

export default adminApiUrlConfig;
