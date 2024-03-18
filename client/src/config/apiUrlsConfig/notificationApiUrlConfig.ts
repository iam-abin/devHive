// Notification are done for only chat. So notifications server functions are defined in chat service
const CANDIDATE_CHAT_URL = `chat/candidate`;
const RECRUITER_CHAT_URL = `chat/recruiter`;


const notificationApiUrlConfig = {
	// Candidate
	getCandidatesNotificationCountUrl: (userId: string) => `${CANDIDATE_CHAT_URL}/notifications-count/${userId}`,
	getCandidatesAllNotificationsUrl: (userId: string) => `${CANDIDATE_CHAT_URL}/notifications/${userId}`,//:userId
	deleteCandidatesAllNotificationsUrl: (userId: string) => `${CANDIDATE_CHAT_URL}/notifications/${userId}`,
	deleteCandidatesAllNotificationsBySenderIdUrl: (senderId: string, receiverId: string) => `${CANDIDATE_CHAT_URL}/delete-notifications-by-senderId/${senderId}/${receiverId}`,
	getCandidatessUnreadMessagesCountUrl: (senderId: string, receiverId: string) => `${CANDIDATE_CHAT_URL}/unread-messages-count/${senderId}/${receiverId}`,

	

	// recruiter
	getRecruiterNotificationCountUrl: (userId: string) => `${RECRUITER_CHAT_URL}/notifications-count/${userId}`,
	getRecruiterAllNotificationsUrl: (userId: string) => `${RECRUITER_CHAT_URL}/notifications/${userId}`,
	deleteRecruiterAllNotificationsUrl: (userId: string) => `${RECRUITER_CHAT_URL}/notifications/${userId}`,
	deleteRecruitersAllNotificationsBySenderIdUrl: (senderId: string, receiverId: string) => `${RECRUITER_CHAT_URL}/delete-notifications-by-senderId/${senderId}/${receiverId}`,
	getRecruitersUnreadMessagesCountUrl: (senderId: string, receiverId: string) => `${RECRUITER_CHAT_URL}/unread-messages-count/${senderId}/${receiverId}`,

};

export default notificationApiUrlConfig;
