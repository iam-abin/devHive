
import chatApiUrlConfig from "../../../config/apiUrlsConfig/chatApiUrlConfig";
import candidateApiCalls from "../../candidate/apiCalls";
import recruiterApiCalls from "../../recruiter/apiCalls";





// export const getAllJobsApi = async (senderId: string): Promise<any> => {
// 		const response: any = await candidateApiCalls("get", chatApiUrlConfig.getARoomChatsUrl(senderId));
// 		console.log("response is",response.data);
	
// 		return response.data;
// };

export const getAllChatRoomsApi = async (senderId: string): Promise<any> => {
    const response: any = await candidateApiCalls("get", chatApiUrlConfig.getAllRoomsUrl(senderId));
    console.log("response is",response.data);

    return response.data;
};


export const getAConversationApi = async (roomId: string): Promise<any> => {
    const response: any = await candidateApiCalls("get", chatApiUrlConfig.getAConversationUrl(roomId));
    console.log("response is",response.data);

    return response.data;
};

// export const getAllRoomsUrl = async (roomId: string): Promise<any> => {
// const response: any = await candidateApiCalls("get", chatApiUrlConfig.getAllRoomsUrl(roomId));
// console.log("response is",response.data);

// return response.data;
// };


