
import notificationApiUrlConfig from "../../../config/apiUrlsConfig/notificationApiUrlConfig";
import candidateApiCalls from "../../candidate/apiCalls";
import recruiterApiCalls from "../../recruiter/apiCalls";


// Candidate
export const getCandidatesNotificationCountApi = async (): Promise<any> => {
    const response: any = await candidateApiCalls("get", notificationApiUrlConfig.getCandidatesNotificationCountUrl);
    return response.data;
};

export const getCandidatesAllNotificationsApi = async (): Promise<any> => {
    const response: any = await candidateApiCalls("get", notificationApiUrlConfig.getCandidatesAllNotificationsUrl);
    return response.data;
};

export const deleteCandidatesAllNotificationsApi = async (): Promise<any> => {
    const response: any = await candidateApiCalls("delete", notificationApiUrlConfig.deleteCandidatesAllNotificationsUrl);
    return response.data;
};

export const deleteCandidatesAllNotificationsBySenderIdApi = async (senderId: string): Promise<any> => {
    const response: any = await candidateApiCalls("delete", notificationApiUrlConfig.deleteCandidatesAllNotificationsBySenderIdUrl(senderId));
    return response.data;
};


export const getCandidatesUnreadMessagesCountApi =  async (senderId: string): Promise<any> => {
    const response: any = await candidateApiCalls("get", notificationApiUrlConfig.getCandidatessUnreadMessagesCountUrl(senderId));
    return response.data;
};

// Recruiter
export const getRecruiterNotificationCountApi = async (): Promise<any> => {
    const response: any = await recruiterApiCalls("get", notificationApiUrlConfig.getRecruiterNotificationCountUrl);
    return response.data;
};


export const getRecruiterAllNotificationsApi = async (): Promise<any> => {
    const response: any = await recruiterApiCalls("get", notificationApiUrlConfig.getRecruiterAllNotificationsUrl);
    return response.data;
};

export const deleteRecruiterAllNotificationsApi = async (): Promise<any> => {
    const response: any = await recruiterApiCalls("delete", notificationApiUrlConfig.deleteRecruiterAllNotificationsUrl);
    return response.data;
};


export const deleteRecruitersAllNotificationsBySenderIdApi = async (senderId: string): Promise<any> => {
    const response: any = await recruiterApiCalls("delete", notificationApiUrlConfig.deleteRecruitersAllNotificationsBySenderIdUrl(senderId));
    return response.data;
};

export const getRecruitersUnreadMessagesCountApi =  async (senderId: string): Promise<any> => {
    const response: any = await recruiterApiCalls("get", notificationApiUrlConfig.getRecruitersUnreadMessagesCountUrl(senderId));
    return response.data;
};