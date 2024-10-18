const CANDIDATE_CHAT_URL = `chat/candidate`;
const RECRUITER_CHAT_URL = `chat/recruiter`;
// const CHAT_URL = `chat`;




const chatApiUrlConfig = {
	// Candidate
	getACandidateConversationUrl: (roomId: string) => `${CANDIDATE_CHAT_URL}/room/conversation/${roomId}`,
	getAllCandidateRoomsUrl: (userId: string) => `${CANDIDATE_CHAT_URL}/chat-rooms/${userId}`,

	// recruiter
	getARecruiterConversationUrl: (roomId: string) => `${RECRUITER_CHAT_URL}/room/conversation/${roomId}`,
	getAllRecruiterRoomsUrl: (userId: string) => `${RECRUITER_CHAT_URL}/chat-rooms/${userId}`,
	
};

export default chatApiUrlConfig;
