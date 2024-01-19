const CANDIDATE_CHAT_URL = `chat/candidate`;
// const RECRUITER_CHAT_URL = `chat/recruiter`;
// const CHAT_URL = `chat`;




const chatApiUrlConfig = {
	// Common
	getAConversationUrl: (roomId: string) => `${CANDIDATE_CHAT_URL}/room-conversation/${roomId}`,
	getAllRoomsUrl: (userId: string) => `${CANDIDATE_CHAT_URL}/chat-rooms/${userId}`,
// 	getJobFieldsDistinctValuesUrl: `${CANDIDATE_JOB_URL}/all-job-fields-distinct-values`,
// 	getAJobUrl: (id: string) => `${RECRUITER_JOB_URL}/${id}`,

// 	// Candidate
// 	candidateApplyJobUrl: `${CANDIDATE_JOB_URL}/apply`,
// 	getAllCandidateAppliedJobsUrl: (candidateId: string, currentPage: number) =>
// 		`${CANDIDATE_JOB_URL}/applied-jobs/${candidateId}/${currentPage}`,

// 	// Recruiter
// 	createJobUrl: `${RECRUITER_JOB_URL}/create`,
// 	updateJobUrl: `${RECRUITER_JOB_URL}/update-job`,
// 	deleteAJobUrl: (id: string) => `${RECRUITER_JOB_URL}/${id}`,
// 	getAllRecruiterAddedJobsUrl: (recruiterId: string) =>
// 		`${RECRUITER_JOB_URL}/created-jobs/${recruiterId}`,
// 	getAllJobsApplicationsForRecruiterUrl: (recruiterId: string) =>
// 		`${RECRUITER_JOB_URL}/job-applications/${recruiterId}`,
// 	getAJobApplicationUrl: (jobApplicationId: string) =>
// 		`${RECRUITER_JOB_URL}/job-application/${jobApplicationId}`,
// 	changeJobApplicationStatusUrl: (jobApplicationId: string) =>
// 		`${RECRUITER_JOB_URL}/change-application-status/${jobApplicationId}`,
};

export default chatApiUrlConfig;
