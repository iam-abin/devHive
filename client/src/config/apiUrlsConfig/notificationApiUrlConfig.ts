// Notification are done for only chat. So notifications server functions are defined in chat service
const CANDIDATE_CHAT_URL = `chat/candidate`;
const RECRUITER_CHAT_URL = `chat/recruiter`;


const notificationApiUrlConfig = {
	// Candidate
	getCandidatesAllNotificationsUrl: `${CANDIDATE_CHAT_URL}/notifications`,
	deleteCandidatesAllNotificationsUrl: `${CANDIDATE_CHAT_URL}/notifications`,
	getCandidatesNotificationCountUrl: `${CANDIDATE_CHAT_URL}/notifications/count`,
	deleteCandidatesAllNotificationsBySenderIdUrl: (senderId: string) => `${CANDIDATE_CHAT_URL}/notifications/sender/${senderId}`,
	getCandidatessUnreadMessagesCountUrl: (senderId: string) => `${CANDIDATE_CHAT_URL}/messages/unread-count/${senderId}`,

	

	// recruiter
	getRecruiterAllNotificationsUrl: `${RECRUITER_CHAT_URL}/notifications`,
	deleteRecruiterAllNotificationsUrl: `${RECRUITER_CHAT_URL}/notifications`,
	getRecruiterNotificationCountUrl: `${RECRUITER_CHAT_URL}/notifications-count`,
	deleteRecruitersAllNotificationsBySenderIdUrl: (senderId: string ) => `${RECRUITER_CHAT_URL}/notifications/sender/${senderId}`,
	getRecruitersUnreadMessagesCountUrl: (senderId: string ) => `${RECRUITER_CHAT_URL}/messages/unread-count/${senderId}`,

};

export default notificationApiUrlConfig;
