const JOB_ADMIN_URL = `admin/job`; // job management in admin service
const RECRUITER_ADMIN_URL = `admin/recruiter`; // recruiter management in admin service
const CANDIDATE_ADMIN_URL = `admin/candidate`;
const DASHBOARD_ADMIN_URL = `admin/dashboard`;
const ADMIN_MEMBERSHIP_PLANS_URL = `admin/membership`;
const ADMIN_PAYMENT_URL = `admin/payment`;

const adminApiUrlConfig = {
    // jobs
    getAllJobsUrl: (page: number, limit: number) =>
        `${JOB_ADMIN_URL}/jobs/${page}/${limit}`,
    blockUnblockJobUrl: (jobId: string) =>
        `${JOB_ADMIN_URL}/blockUnblock/${jobId}`,
    viewJobDetailsUrl: (jobId: string) => `${JOB_ADMIN_URL}/viewJob/${jobId}`,

    // Recruiter
    getAllRecruitersUrl: (page: number, limit: number) =>
        `${RECRUITER_ADMIN_URL}/recruiters/${page}/${limit}`,
    blockUnblockRecruiterUrl: (userId: string) =>
        `${RECRUITER_ADMIN_URL}/blockUnblock/${userId}`,
    viewRecruiterProfileDetailsUrl: (userId: string) =>
        `${RECRUITER_ADMIN_URL}/viewProfile/${userId}`,

    // Candidate
    getAllCandidatesUrl: (page: number, limit: number) =>
        `${CANDIDATE_ADMIN_URL}/candidates/${page}/${limit}`,
    blockUnblockCandidateUrl: (userId: string) =>
        `${CANDIDATE_ADMIN_URL}/blockUnblock/${userId}`,
    viewCandidateProfileDetailsUrl: (userId: string) =>
        `${CANDIDATE_ADMIN_URL}/viewProfile/${userId}`,

    // Premium plans
    getAllMembershipPlansUrl: (page: number, limit: number) =>
        `${ADMIN_MEMBERSHIP_PLANS_URL}/view-membership-plans/${page}/${limit}`,
    createMembershipPlanUrl: `${ADMIN_MEMBERSHIP_PLANS_URL}/create-membership-plan`,
    updateMembershipPlanUrl: `${ADMIN_MEMBERSHIP_PLANS_URL}/update-membership-plan`,
    getAMembershipPlanUrl: (membershipPlanId: string) =>
        `${ADMIN_MEMBERSHIP_PLANS_URL}/view-membership-plan/${membershipPlanId}`,
    blockUnblockMembershipPlanUrl: (membershipPlanId: string) =>
        `${ADMIN_MEMBERSHIP_PLANS_URL}/block-unblock-membership-plan/${membershipPlanId}`,

    // Payment
    getAllPaymentsUrl: (page: number, limit: number) =>
        `${ADMIN_PAYMENT_URL}/get-all-payments/${page}/${limit}`,

    // dashboard
    getAllCardsDetailsUrl: `${DASHBOARD_ADMIN_URL}/data`,
    getGraphDataUrl: `${DASHBOARD_ADMIN_URL}/graph-data`,
};

export default adminApiUrlConfig;
