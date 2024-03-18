
import chatApiUrlConfig from "../../../config/apiUrlsConfig/chatApiUrlConfig";
import candidateApiCalls from "../../candidate/apiCalls";
import recruiterApiCalls from "../../recruiter/apiCalls";



export const getAllCandidateChatRoomsApi = async (senderId: string): Promise<any> => {
    const response: any = await candidateApiCalls("get", chatApiUrlConfig.getAllCandidateRoomsUrl(senderId));
    console.log("response is",response.data);

    return response.data;
};


export const getACandidateConversationApi = async (roomId: string): Promise<any> => {
    const response: any = await candidateApiCalls("get", chatApiUrlConfig.getACandidateConversationUrl(roomId));
    console.log("response is",response.data);

    return response.data;
};



export const getAllRecruiterChatRoomsApi = async (senderId: string): Promise<any> => {
    const response: any = await recruiterApiCalls("get", chatApiUrlConfig.getAllRecruiterRoomsUrl(senderId));
    console.log("response is",response.data);

    return response.data;
};



export const getARecrutierConversationApi = async (roomId: string): Promise<any> => {
    const response: any = await recruiterApiCalls("get", chatApiUrlConfig.getARecruiterConversationUrl(roomId));
    console.log("response is",response.data);

    return response.data;
};