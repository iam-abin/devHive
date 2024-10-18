const CANDIDATE_JOB_URL = `job/candidate`;
const RECRUITER_JOB_URL = `job/recruiter`;


const jobApiUrlConfig = {
	// Common
	getAllJobsUrl: (page: number) => `${CANDIDATE_JOB_URL}/all-jobs/${page}`,
	filterJobsUrl: `${CANDIDATE_JOB_URL}/filter`,
	getJobFieldsDistinctValuesUrl: `${CANDIDATE_JOB_URL}/all-job-fields-distinct-values`,
	getAJobUrl: (id: string) => `${RECRUITER_JOB_URL}/${id}`,
	
	// Candidate
	candidateApplyJobUrl:(jobId: string ) => `${CANDIDATE_JOB_URL}/apply/${jobId}`,

	getAllCandidateAppliedJobsUrl: (candidateId: string, currentPage: number) =>
	`${CANDIDATE_JOB_URL}/applied-jobs/${candidateId}/${currentPage}`,
	
	// Recruiter
	
	createJobUrl: `${RECRUITER_JOB_URL}/create`,
	getRecruiterDashboadGraphUrl: (recruiterId: string) => `${RECRUITER_JOB_URL}/getRecruiterDashboard/graphDetails/${recruiterId}`,
	getRecruiterDashboardCardsUrl: (recruiterId: string) => `${RECRUITER_JOB_URL}/getRecruiterDashboard/cardsDetails/${recruiterId}`,
	changeJobCloseStatusUrl: (id: string) => `${RECRUITER_JOB_URL}/change-close-status/${id}`,
	updateJobUrl: `${RECRUITER_JOB_URL}/update-job`,
	deleteAJobUrl: (id: string) => `${RECRUITER_JOB_URL}/${id}`,
	getAllRecruiterAddedJobsUrl: (recruiterId: string) =>
		`${RECRUITER_JOB_URL}/created-jobs/${recruiterId}`,
	getAllJobsApplicationsForRecruiterUrl: (recruiterId: string) =>
		`${RECRUITER_JOB_URL}/job-applications/${recruiterId}`,
	getAJobApplicationUrl: (jobApplicationId: string) =>
		`${RECRUITER_JOB_URL}/job-application/${jobApplicationId}`,
	getAnAppliedJobUrl: (jobApplicationId: string) =>
	`${CANDIDATE_JOB_URL}/job-application/${jobApplicationId}`,
	changeJobApplicationStatusUrl: (jobApplicationId: string) =>
		`${RECRUITER_JOB_URL}/change-application-status/${jobApplicationId}`,
	};


export default jobApiUrlConfig;
