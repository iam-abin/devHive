
import chatApiUrlConfig from "../../../config/apiUrlsConfig/chatApiUrlConfig";
import { IResponse } from "../../../types/api";
import candidateApiCalls from "../../candidate/apiCalls";
import recruiterApiCalls from "../../recruiter/apiCalls";



export const getAllCandidateChatRoomsApi = async (senderId: string): Promise<IResponse> => {
    return await candidateApiCalls("get", chatApiUrlConfig.getAllCandidateRoomsUrl(senderId));
};


export const getACandidateConversationApi = async (roomId: string): Promise<IResponse> => {
    return await candidateApiCalls("get", chatApiUrlConfig.getACandidateConversationUrl(roomId));
};



export const getAllRecruiterChatRoomsApi = async (senderId: string): Promise<IResponse> => {
    return await recruiterApiCalls("get", chatApiUrlConfig.getAllRecruiterRoomsUrl(senderId));
};



export const getARecrutierConversationApi = async (roomId: string): Promise<IResponse> => {
    return await recruiterApiCalls("get", chatApiUrlConfig.getARecruiterConversationUrl(roomId));
};