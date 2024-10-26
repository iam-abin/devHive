const CANDIDATE_JOB_URL = `job/candidate`;
const RECRUITER_JOB_URL = `job/recruiter`;

const jobApiUrlConfig = {
    // Common
    getAllJobsUrl: (page: number) => `${CANDIDATE_JOB_URL}/all-jobs/${page}`,
    filterJobsUrl: `${CANDIDATE_JOB_URL}/filter`,
    getJobFieldsDistinctValuesUrl: `${CANDIDATE_JOB_URL}/all-job-fields-distinct-values`,
    getAJobUrl: (id: string) => `${RECRUITER_JOB_URL}/${id}`,

    // Candidate
    candidateApplyJobUrl: (jobId: string) =>
        `${CANDIDATE_JOB_URL}/apply/${jobId}`,

    checkAppliedUrl: (jobId: string) =>
        `${CANDIDATE_JOB_URL}/hasApplied/${jobId}`,

    getAllCandidateAppliedJobsUrl: (candidateId: string, currentPage: number) =>
        `${CANDIDATE_JOB_URL}/applied/${candidateId}/${currentPage}`,

    // Recruiter

    createJobUrl: `${RECRUITER_JOB_URL}/create`,
    getRecruiterDashboadGraphUrl: () =>
        `${RECRUITER_JOB_URL}/dashboard/graphDetails`,
    getRecruiterDashboardCardsUrl: () =>
        `${RECRUITER_JOB_URL}/dashboard/cardsDetails`,
    changeJobCloseStatusUrl: (id: string) =>
        `${RECRUITER_JOB_URL}/change-close-status/${id}`,

    updateJobUrl: `${RECRUITER_JOB_URL}/update`,

    deleteAJobUrl: (id: string) => `${RECRUITER_JOB_URL}/${id}`,
    getAllRecruiterAddedJobsUrl: (page: number, limit: number) =>
        `${RECRUITER_JOB_URL}/created-jobs/${page}/${limit}`,
    getAllJobsApplicationsForRecruiterUrl: (page: number, limit: number) =>
        `${RECRUITER_JOB_URL}/applications/${page}/${limit}`,
    getAJobApplicationUrl: (jobApplicationId: string) =>
        `${RECRUITER_JOB_URL}/application/${jobApplicationId}`,
    getAnAppliedJobUrl: (jobApplicationId: string) =>
        `${CANDIDATE_JOB_URL}/application/${jobApplicationId}`,
    changeJobApplicationStatusUrl: (jobApplicationId: string) =>
        `${RECRUITER_JOB_URL}/change-application-status/${jobApplicationId}`,

    editJobUrl: (jobId: string) => `${RECRUITER_JOB_URL}/edit/${jobId}`,
};

export default jobApiUrlConfig;
