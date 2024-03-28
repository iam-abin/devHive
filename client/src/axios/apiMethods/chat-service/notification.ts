
import notificationApiUrlConfig from "../../../config/apiUrlsConfig/notificationApiUrlConfig";
import candidateApiCalls from "../../candidate/apiCalls";
import recruiterApiCalls from "../../recruiter/apiCalls";


// Candidate
export const getCandidatesNotificationCountApi = async (userId: string): Promise<any> => {
    const response: any = await candidateApiCalls("get", notificationApiUrlConfig.getCandidatesNotificationCountUrl(userId));
    return response.data;
};

export const getCandidatesAllNotificationsApi = async (userId: string): Promise<any> => {
    const response: any = await candidateApiCalls("get", notificationApiUrlConfig.getCandidatesAllNotificationsUrl(userId));
    return response.data;
};

export const deleteCandidatesAllNotificationsApi = async (userId: string): Promise<any> => {
    const response: any = await candidateApiCalls("delete", notificationApiUrlConfig.deleteCandidatesAllNotificationsUrl(userId));
    return response.data;
};

export const deleteCandidatesAllNotificationsBySenderIdApi = async (senderId: string, receiverId: string): Promise<any> => {
    const response: any = await candidateApiCalls("delete", notificationApiUrlConfig.deleteCandidatesAllNotificationsBySenderIdUrl(senderId, receiverId));
    return response.data;
};


export const getCandidatesUnreadMessagesCountApi =  async (senderId: string, receiverId: string): Promise<any> => {
    const response: any = await candidateApiCalls("get", notificationApiUrlConfig.getCandidatessUnreadMessagesCountUrl(senderId, receiverId));
    return response.data;
};

// Recruiter
export const getRecruiterNotificationCountApi = async (userId: string): Promise<any> => {
    const response: any = await recruiterApiCalls("get", notificationApiUrlConfig.getRecruiterNotificationCountUrl(userId));
    return response.data;
};


export const getRecruiterAllNotificationsApi = async (userId: string): Promise<any> => {
    const response: any = await recruiterApiCalls("get", notificationApiUrlConfig.getRecruiterAllNotificationsUrl(userId));
    return response.data;
};

export const deleteRecruiterAllNotificationsApi = async (userId: string): Promise<any> => {
    const response: any = await recruiterApiCalls("delete", notificationApiUrlConfig.deleteRecruiterAllNotificationsUrl(userId));
    return response.data;
};


export const deleteRecruitersAllNotificationsBySenderIdApi = async (senderId: string, receiverId: string): Promise<any> => {
    const response: any = await recruiterApiCalls("delete", notificationApiUrlConfig.deleteRecruitersAllNotificationsBySenderIdUrl(senderId, receiverId));
    return response.data;
};

export const getRecruitersUnreadMessagesCountApi =  async (senderId: string, receiverId: string): Promise<any> => {
    const response: any = await recruiterApiCalls("get", notificationApiUrlConfig.getRecruitersUnreadMessagesCountUrl(senderId, receiverId));
    return response.data;
};