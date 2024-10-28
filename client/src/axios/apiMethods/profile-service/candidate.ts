
import profileApiUrlConfig from "../../../config/apiUrlsConfig/profileApiUrlConfig";
import makeApiCall from "../../apiCalls";


export const getCandidateProfileApi = async (userId: string): Promise<any> => {
    return makeApiCall("get", profileApiUrlConfig.getCandidateProfileUrl(userId), userId);
};

export const updateCandidateProfileApi = async (candidateProfileData: any): Promise<any> => {
    return makeApiCall("patch", profileApiUrlConfig.updateCandidateProfileUrl, candidateProfileData);
};

export const uploadCandidateImageProfileApi = async (profileImageData: any): Promise<any> => {
    return makeApiCall("put", profileApiUrlConfig.uploadCandidateImageUrl, profileImageData, true);
};

export const uploadCandidateResumeProfileApi = async (resumeData: any): Promise<any> => {
    return makeApiCall("put", profileApiUrlConfig.uploadCandidateResumeUrl, resumeData, false); 
};

export const deleteResumeApi = async (candidateId: string): Promise<any> => {
    return makeApiCall("patch", profileApiUrlConfig.deleteResumeUrl(candidateId)); 
};

export const updateCandidateSkillsProfileApi = async (skills: Array<string>): Promise<any> => {
    const data = {
        skills
    }
    return makeApiCall("patch", profileApiUrlConfig.updateCandidateSkillsUrl, data, true);
};

export const updateCandidatePreferredJobsProfileApi = async (preferredJobs: Array<string>): Promise<any> => {
    const data = {
        preferredJobs
    }
    return makeApiCall("patch", profileApiUrlConfig.updateCandidatePreferredJobsUrl, data, true);
};


export const recruiterGetProfileByCandidateApi = async (userId: string): Promise<any> => {
	return makeApiCall("get", profileApiUrlConfig.getRecruiterProfileUrl(userId), userId);
};