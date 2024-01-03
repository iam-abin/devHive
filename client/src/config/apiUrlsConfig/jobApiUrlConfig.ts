const CANDIDATE_JOB_URL = `job/candidate`;
const RECRUITER_JOB_URL = `job/recruiter`;
const JOB_URL = `/job`;

const jobApiUrlConfig = {
	// Common
	// getAllJobsUrl: `${CANDIDATE_JOB_URL}`,
	getAllJobsUrl: (page: number) => `${CANDIDATE_JOB_URL}/all-jobs/${page}`,
	// getAllJobsUrl: (page: number) => `${RECRUITER_JOB_URL}/${page}`,

	getAJobUrl: (id: string) => `${RECRUITER_JOB_URL}/${id}`,

	// Candidate
	candidateApplyJobUrl: `${CANDIDATE_JOB_URL}/apply`,
	getAllCandidateAppliedJobsUrl: (candidateId: string, currentPage: number) => `${CANDIDATE_JOB_URL}/applied-jobs/${candidateId}/${currentPage}`,

	

	// Recruiter
	getAllRecruiterAddedJobsUrl: (recruiterId: string) => `${RECRUITER_JOB_URL}/created-jobs/${recruiterId}`,
	getAllJobsApplicationsForRecruiterUrl: (recruiterId: string) => `${RECRUITER_JOB_URL}/job-applications/${recruiterId}`,

	getAJobApplicationUrl: (jobApplicationId: string) => `${RECRUITER_JOB_URL}/job-application/${jobApplicationId}`,
	changeJobApplicationStatusUrl: (jobApplicationId: string) => `${RECRUITER_JOB_URL}/change-application-status/${jobApplicationId}`,


	createJobUrl: `${RECRUITER_JOB_URL}/create`,
	updateJobUrl: `${RECRUITER_JOB_URL}/update-job`,
	deleteAJobUrl: (id: string) => `${RECRUITER_JOB_URL}/${id}`,

};

export default jobApiUrlConfig;
