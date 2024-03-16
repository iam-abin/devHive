// Notification are done for only chat. So notifications server functions are defined in chat service
const CANDIDATE_CHAT_URL = `chat/candidate`;
const RECRUITER_CHAT_URL = `chat/recruiter`;


const notificationApiUrlConfig = {
	// Candidate
	getCandidatesNotificationCountUrl: (userId: string) => `${CANDIDATE_CHAT_URL}/notifications-count/${userId}`,
	getCandidatesAllNotificationsUrl: (userId: string) => `${CANDIDATE_CHAT_URL}/notifications/${userId}`,//:userId
	deleteCandidatesAllNotificationsUrl: (userId: string) => `${CANDIDATE_CHAT_URL}/notifications/${userId}`,
	deleteCandidatesAllNotificationsBySenderIdUrl: (senderId: string) => `${CANDIDATE_CHAT_URL}/delete-notifications-by-senderId/${senderId}`,
	

	// recruiter
	getRecruiterNotificationCountUrl: (userId: string) => `${RECRUITER_CHAT_URL}/notifications-count/${userId}`,
	getRecruiterAllNotificationsUrl: (userId: string) => `${RECRUITER_CHAT_URL}/notificatons/${userId}`,
	deleteRecruiterAllNotificationsUrl: (userId: string) => `${RECRUITER_CHAT_URL}/notificatons/${userId}`,
	
};

export default notificationApiUrlConfig;
