const CANDIDATE_JOB_URL = `job/candidate`;
const RECRUITER_JOB_URL = `job/recruiter`;

const jobApiUrlConfig = {
    // Common for landing page and candidate
    getAllJobsUrl: (page: number) => `${CANDIDATE_JOB_URL}/jobs/${page}`,
    getJobFilterBarValuesUrl: `${CANDIDATE_JOB_URL}/filter-bar-values`,
    filterJobsUrl: (page: number,limit: number)=> `${CANDIDATE_JOB_URL}/filter/${page}/${limit}`,
    
    // Common for candidate and recruiter
    searchJobsUrl: (page: number,limit: number)=> `${CANDIDATE_JOB_URL}/search/${page}/${limit}`,
    
    // Candidate
    getAJobCandidateUrl: (id: string) => `${CANDIDATE_JOB_URL}/${id}`,
    getSearchResultsUrl: (searchKey: string, resourceType: string, page: number, limit: number) =>
        `${CANDIDATE_JOB_URL}/search/${resourceType}/${page}/${limit}?searchKey=${searchKey}`,
    candidateApplyJobUrl: (jobId: string) =>
        `${CANDIDATE_JOB_URL}/apply/${jobId}`,
    
    getAnAppliedJobUrl: (jobApplicationId: string) =>
        `${CANDIDATE_JOB_URL}/application/${jobApplicationId}`,
    getAllCandidateAppliedJobsUrl: (page: number, limit: number) =>
        `${CANDIDATE_JOB_URL}/applied/${page}/${limit}`,

    checkAppliedUrl: (jobId: string) =>
        `${CANDIDATE_JOB_URL}/hasApplied/${jobId}`,
    
    
    // Recruiter
    createJobUrl: `${RECRUITER_JOB_URL}/create`,
    getAJobRecruiterUrl: (id: string) => `${RECRUITER_JOB_URL}/${id}`,
    updateJobUrl: (jobId: string) => `${RECRUITER_JOB_URL}/edit/${jobId}`,
    deleteAJobUrl: (id: string) => `${RECRUITER_JOB_URL}/${id}`,

    changeJobCloseStatusUrl: (id: string) =>
        `${RECRUITER_JOB_URL}/change-close-status/${id}`,

    getAllRecruiterAddedJobsUrl: (page: number, limit: number) =>
        `${RECRUITER_JOB_URL}/created-jobs/${page}/${limit}`,
    getAllJobsApplicationsForRecruiterUrl: (page: number, limit: number) =>
        `${RECRUITER_JOB_URL}/applications/${page}/${limit}`,
    getAJobApplicationUrl: (jobApplicationId: string) =>
        `${RECRUITER_JOB_URL}/application/${jobApplicationId}`,
    changeJobApplicationStatusUrl: (jobApplicationId: string) =>
        `${RECRUITER_JOB_URL}/application/status/${jobApplicationId}`,
    
    getRecruiterDashboadGraphUrl: () =>
        `${RECRUITER_JOB_URL}/dashboard/graph-data`,
    getRecruiterDashboardCardsUrl: () =>
        `${RECRUITER_JOB_URL}/dashboard/cards-data`,

};

export default jobApiUrlConfig;
