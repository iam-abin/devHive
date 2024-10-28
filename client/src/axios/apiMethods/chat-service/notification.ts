
import notificationApiUrlConfig from "../../../config/apiUrlsConfig/notificationApiUrlConfig";
import { IResponse } from "../../../types/api";
import makeApiCall from "../../apiCalls";


// Candidate
export const getCandidatesNotificationCountApi = async (): Promise<IResponse> => {
    return await makeApiCall("get", notificationApiUrlConfig.getCandidatesNotificationCountUrl);
};

export const getCandidatesAllNotificationsApi = async (): Promise<IResponse> => {
    return await makeApiCall("get", notificationApiUrlConfig.getCandidatesAllNotificationsUrl);
};

export const deleteCandidatesAllNotificationsApi = async (): Promise<IResponse> => {
    return await makeApiCall("delete", notificationApiUrlConfig.deleteCandidatesAllNotificationsUrl);
};

export const deleteCandidatesAllNotificationsBySenderIdApi = async (senderId: string): Promise<IResponse> => {
    return await makeApiCall("delete", notificationApiUrlConfig.deleteCandidatesAllNotificationsBySenderIdUrl(senderId));
};


export const getCandidatesUnreadMessagesCountApi =  async (senderId: string): Promise<IResponse> => {
    return await makeApiCall("get", notificationApiUrlConfig.getCandidatessUnreadMessagesCountUrl(senderId));
};

// Recruiter
export const getRecruiterNotificationCountApi = async (): Promise<IResponse> => {
    return await makeApiCall("get", notificationApiUrlConfig.getRecruiterNotificationCountUrl);
};


export const getRecruiterAllNotificationsApi = async (): Promise<IResponse> => {
    return await makeApiCall("get", notificationApiUrlConfig.getRecruiterAllNotificationsUrl);
};

export const deleteRecruiterAllNotificationsApi = async (): Promise<IResponse> => {
    return await makeApiCall("delete", notificationApiUrlConfig.deleteRecruiterAllNotificationsUrl);
};


export const deleteRecruitersAllNotificationsBySenderIdApi = async (senderId: string): Promise<IResponse> => {
    return await makeApiCall("delete", notificationApiUrlConfig.deleteRecruitersAllNotificationsBySenderIdUrl(senderId));
};

export const getRecruitersUnreadMessagesCountApi =  async (senderId: string): Promise<IResponse> => {
    return await makeApiCall("get", notificationApiUrlConfig.getRecruitersUnreadMessagesCountUrl(senderId));
};