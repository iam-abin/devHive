
import chatApiUrlConfig from "../../../config/apiUrlsConfig/chatApiUrlConfig";
import { IResponse } from "../../../types/api";
import makeApiCall from "../../apiCalls";



export const getAllCandidateChatRoomsApi = async (senderId: string): Promise<IResponse> => {
    return await makeApiCall("get", chatApiUrlConfig.getAllCandidateRoomsUrl(senderId));
};


export const getACandidateConversationApi = async (roomId: string): Promise<IResponse> => {
    return await makeApiCall("get", chatApiUrlConfig.getACandidateConversationUrl(roomId));
};



export const getAllRecruiterChatRoomsApi = async (senderId: string): Promise<IResponse> => {
    return await makeApiCall("get", chatApiUrlConfig.getAllRecruiterRoomsUrl(senderId));
};



export const getARecrutierConversationApi = async (roomId: string): Promise<IResponse> => {
    return await makeApiCall("get", chatApiUrlConfig.getARecruiterConversationUrl(roomId));
};