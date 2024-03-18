
import notificationApiUrlConfig from "../../../config/apiUrlsConfig/notificationApiUrlConfig";
import candidateApiCalls from "../../candidate/apiCalls";
import recruiterApiCalls from "../../recruiter/apiCalls";


// Candidate
export const getCandidatesNotificationCountApi = async (userId: string): Promise<any> => {
    const response: any = await candidateApiCalls("get", notificationApiUrlConfig.getCandidatesNotificationCountUrl(userId));
    console.log("response is",response.data);

    return response.data;
};

export const getCandidatesAllNotificationsApi = async (userId: string): Promise<any> => {
    const response: any = await candidateApiCalls("get", notificationApiUrlConfig.getCandidatesAllNotificationsUrl(userId));
    console.log("response is",response.data);

    return response.data;
};

export const deleteCandidatesAllNotificationsApi = async (userId: string): Promise<any> => {
    const response: any = await candidateApiCalls("delete", notificationApiUrlConfig.deleteCandidatesAllNotificationsUrl(userId));
    console.log("response is",response.data);

    return response.data;
};

export const deleteCandidatesAllNotificationsBySenderIdApi = async (senderId: string, receiverId: string): Promise<any> => {
    const response: any = await candidateApiCalls("delete", notificationApiUrlConfig.deleteCandidatesAllNotificationsBySenderIdUrl(senderId, receiverId));
    console.log("response is",response.data);

    return response.data;
};

// Recruiter
export const getRecruiterNotificationCountApi = async (userId: string): Promise<any> => {
    const response: any = await recruiterApiCalls("get", notificationApiUrlConfig.getRecruiterNotificationCountUrl(userId));
    console.log("response is",response.data);

    return response.data;
};


export const getRecruiterAllNotificationsApi = async (userId: string): Promise<any> => {
    const response: any = await recruiterApiCalls("get", notificationApiUrlConfig.getRecruiterAllNotificationsUrl(userId));
    console.log("response is",response.data);

    return response.data;
};

export const deleteRecruiterAllNotificationsApi = async (userId: string): Promise<any> => {
    const response: any = await recruiterApiCalls("delete", notificationApiUrlConfig.deleteRecruiterAllNotificationsUrl(userId));
    console.log("response is",response.data);

    return response.data;
};

export const deleteRecruitersAllNotificationsBySenderIdApi = async (senderId: string, receiverId: string): Promise<any> => {
    const response: any = await recruiterApiCalls("delete", notificationApiUrlConfig.deleteRecruitersAllNotificationsBySenderIdUrl(senderId, receiverId));
    console.log("response is",response.data);

    return response.data;
};