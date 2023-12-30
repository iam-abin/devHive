
const CANDIDATE_JOB_URL = `job/candidate`;
const RECRUITER_JOB_URL = `job/recruiter`;

const jobApiUrlConfig = {

	// Candidate // // or Common
	getAllJobsUrl: `${CANDIDATE_JOB_URL}`,
    

    
	// Recruiter
	getAllRecruiterAddedJobsUrl: (recruiterId: string) => `${RECRUITER_JOB_URL}/created-jobs/${recruiterId}`,
	getAJobUrl:(id: string) => `${RECRUITER_JOB_URL}/${id}`,
	createJobUrl: `${RECRUITER_JOB_URL}/create`,
	updateJobUrl: `${RECRUITER_JOB_URL}/update-job`,



};

export default jobApiUrlConfig;
