const JOB_ADMIN_URL = `admin/job`; // job management in admin service
const RECRUITER_ADMIN_URL = `admin/recruiter`; // recruiter management in admin service
const CANDIDATE_ADMIN_URL = `admin/candidate`;
const DASHBOARD_ADMIN_URL = `admin/dashboard`;
const ADMIN_MEMBERSHIP_PLANS_URL = `admin/membership`;
const ADMIN_PAYMENT_URL = `admin/payment`

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


	// Premium plans
	getAllMembershipPlansUrl: `${ADMIN_MEMBERSHIP_PLANS_URL}/view-membership-plans`,
	createMembershipPlanUrl: `${ADMIN_MEMBERSHIP_PLANS_URL}/create-membership-plan`,
	updateMembershipPlanUrl: `${ADMIN_MEMBERSHIP_PLANS_URL}/update-membership-plan`,
	getAMembershipPlanUrl: (membershipPlanId: string) =>
		`${ADMIN_MEMBERSHIP_PLANS_URL}/view-membership-plan/${membershipPlanId}`,
	blockUnblockMembershipPlanUrl: (membershipPlanId: string) =>
	`${ADMIN_MEMBERSHIP_PLANS_URL}/block-unblock-membership-plan/${membershipPlanId}`,


	// Payment
	getAllPaymentsUrl: `${ADMIN_PAYMENT_URL}/get-all-payments`,


	// dashboard 
	getAllCardsDetailsUrl: `${DASHBOARD_ADMIN_URL}/data`,
	getGraphDataUrl: `${DASHBOARD_ADMIN_URL}/graph-data`,
};



export default adminApiUrlConfig;
