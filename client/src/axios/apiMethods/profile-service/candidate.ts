
import profileApiUrlConfig from "../../../config/apiUrlsConfig/profileApiUrlConfig";
import candidateApiCalls from "../../candidate/apiCalls";


export const candidateGetProfileApi = async (userId: string): Promise<any> => {
    return candidateApiCalls("get", profileApiUrlConfig.getCandidateProfileUrl(userId), userId);
};

export const updateCandidateProfileApi = async (candidateProfileData: any): Promise<any> => {
    return candidateApiCalls("patch", profileApiUrlConfig.updateCandidateProfileUrl, candidateProfileData);
};

export const uploadCandidateImageProfileApi = async (profileImageData: any): Promise<any> => {
    return candidateApiCalls("put", profileApiUrlConfig.uploadCandidateImageUrl, profileImageData, true);
};

export const uploadCandidateResumeProfileApi = async (resumeData: any): Promise<any> => {
    return candidateApiCalls("put", profileApiUrlConfig.uploadCandidateResumeUrl, resumeData, false); 
};

export const deleteResumeApi = async (candidateId: string): Promise<any> => {
    return candidateApiCalls("patch", profileApiUrlConfig.deleteResumeUrl(candidateId)); 
};

export const updateCandidateSkillsProfileApi = async (userId: string,skills: Array<string>): Promise<any> => {
    let data = {
        id: userId,
        skills
    }
    return candidateApiCalls("patch", profileApiUrlConfig.updateCandidateSkillsUrl, data, true);
};

export const updateCandidatePreferredJobsProfileApi = async (userId: string,preferredJobs: Array<string>): Promise<any> => {
    let data = {
        id: userId,
        preferredJobs
    }
    return candidateApiCalls("patch", profileApiUrlConfig.updateCandidatePreferredJobsUrl, data, true);
};


export const recruiterGetProfileByCandidateApi = async (userId: string): Promise<any> => {
	return candidateApiCalls("get", profileApiUrlConfig.getRecruiterProfileUrl(userId), userId);
};