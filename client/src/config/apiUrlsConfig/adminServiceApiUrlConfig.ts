const JOB_ADMIN_URL = `admin/job`; // job management in admin service
const RECRUITER_ADMIN_URL = `admin/recruiter`; // recruiter management in admin service
const CANDIDATE_ADMIN_URL = `admin/candidate`;
const DASHBOARD_ADMIN_URL = `admin/dashboard`;
const ADMIN_MEMBERSHIP_PLANS_URL = `admin/membership`;
const ADMIN_PAYMENT_URL = `admin/payment`;

const adminApiUrlConfig = {
    // Jobs
    getAllJobsUrl: (page: number, limit: number) =>
        `${JOB_ADMIN_URL}/jobs/${page}/${limit}`,
    blockUnblockJobUrl: (jobId: string) =>
        `${JOB_ADMIN_URL}/block-unblock/${jobId}`,
    getAJobAdminUrl: (jobId: string) => `${JOB_ADMIN_URL}/${jobId}`,

    // Recruiter
    getAllRecruitersUrl: (page: number, limit: number) =>
        `${RECRUITER_ADMIN_URL}/recruiters/${page}/${limit}`,
    blockUnblockRecruiterUrl: (userId: string) =>
        `${RECRUITER_ADMIN_URL}/block-unblock/${userId}`,
    viewRecruiterProfileDetailsUrl: (userId: string) =>
        `${RECRUITER_ADMIN_URL}/view-profile/${userId}`,

    // Candidate
    getAllCandidatesUrl: (page: number, limit: number) =>
        `${CANDIDATE_ADMIN_URL}/candidates/${page}/${limit}`,
    blockUnblockCandidateUrl: (userId: string) =>
        `${CANDIDATE_ADMIN_URL}/block-unblock/${userId}`,
    viewCandidateProfileDetailsUrl: (userId: string) =>
        `${CANDIDATE_ADMIN_URL}/view-profile/${userId}`,

    // Premium plans
    getAllMembershipPlansUrl: (page: number, limit: number) =>
        `${ADMIN_MEMBERSHIP_PLANS_URL}/plans/${page}/${limit}`,
    createMembershipPlanUrl: `${ADMIN_MEMBERSHIP_PLANS_URL}/create`,
    updateMembershipPlanUrl: `${ADMIN_MEMBERSHIP_PLANS_URL}/update`,
    getAMembershipPlanUrl: (membershipPlanId: string) =>
        `${ADMIN_MEMBERSHIP_PLANS_URL}/plan/${membershipPlanId}`,
    blockUnblockMembershipPlanUrl: (membershipPlanId: string) =>
        `${ADMIN_MEMBERSHIP_PLANS_URL}/block-unblock/${membershipPlanId}`,

    // Payment
    getAllPaymentsUrl: (page: number, limit: number) =>
        `${ADMIN_PAYMENT_URL}/payments/${page}/${limit}`,

    // dashboard
    getAllCardsDetailsUrl: `${DASHBOARD_ADMIN_URL}/cards-data`,
    getGraphDataUrl: `${DASHBOARD_ADMIN_URL}/graph-data`,
};

export default adminApiUrlConfig;
