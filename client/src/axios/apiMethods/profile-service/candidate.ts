
import profileApiUrlConfig from "../../../config/apiUrlsConfig/profileApiUrlConfig";
import makeApiCall from "../../apiCalls";


export const getCandidateProfileApi = async (): Promise<any> => {
    return makeApiCall("get", profileApiUrlConfig.getCandidateProfileUrl);
};

export const updateCandidateProfileApi = async (candidateProfileData: any): Promise<any> => {
    return makeApiCall("patch", profileApiUrlConfig.updateCandidateProfileUrl, candidateProfileData);
};

export const updateCandidateSkillsApi = async (skills: Array<string>): Promise<any> => {
    const data = {
        skills
    }
    return makeApiCall("patch", profileApiUrlConfig.updateCandidateSkillsUrl, data, true);
};

export const updateCandidatePreferredJobsApi = async (preferredJobs: Array<string>): Promise<any> => {
    const data = {
        preferredJobs
    }
    return makeApiCall("patch", profileApiUrlConfig.updateCandidatePreferredJobsUrl, data, true);
};

export const uploadCandidateImageApi = async (profileImageData: any): Promise<any> => {
    return makeApiCall("patch", profileApiUrlConfig.uploadCandidateImageUrl, profileImageData, true);
};

export const uploadCandidateResumeApi = async (resumeData: any): Promise<any> => {
    return makeApiCall("patch", profileApiUrlConfig.uploadCandidateResumeUrl, resumeData, false); 
};

export const deleteResumeApi = async (): Promise<any> => {
    return makeApiCall("delete", profileApiUrlConfig.deleteResumeUrl); 
};

export const getARecruiterProfileApi = async (userId: string): Promise<any> => {
	return makeApiCall("get", profileApiUrlConfig.getARecruiterProfileUrl(userId));
};