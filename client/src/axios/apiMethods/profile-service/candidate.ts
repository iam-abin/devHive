
import profileApiUrlConfig from "../../../config/apiUrlsConfig/profileApiUrlConfig";
import { notify } from "../../../utils/toastMessage";
import candidateApiCalls from "../../candidate/apiCalls";


export const candidateGetProfileApi = async (userId: string): Promise<any> => {
    const response: any = await candidateApiCalls("get", profileApiUrlConfig.getCandidateProfileUrl(userId), userId);
    return response.data;
};


export const updateCandidateProfileApi = async (candidateProfileData: any): Promise<any> => {
    const response: any = await candidateApiCalls("patch", profileApiUrlConfig.updateCandidateProfileUrl, candidateProfileData);
    return response.data;
};


export const uploadCandidateImageProfileApi = async (profile_imageData: any): Promise<any> => {
    const response: any = await candidateApiCalls("put", profileApiUrlConfig.uploadCandidateImageUrl, profile_imageData, true);
    // isFileUpload is giving 'true' because we are sending a file to the backend.
    return response.data;
};

export const uploadCandidateResumeProfileApi = async (resumeData: any): Promise<any> => {
    const response: any = await candidateApiCalls("put", profileApiUrlConfig.uploadCandidateResumeUrl, resumeData, false); 
    // isFileUpload is giving 'false' because we are sending filename and url of uploaded resume in the client side using firebase.
    // by default it is false
    return response.data;
};

export const deleteResumeApi = async (candidateId: string): Promise<any> => {
    const response: any = await candidateApiCalls("patch", profileApiUrlConfig.deleteResumeUrl(candidateId)); 
    return response.data;
};

export const updateCandidateSkillsProfileApi = async (userId: string,skills: Array<string>): Promise<any> => {
    let data = {
        id: userId,
        skills
    }
    const response: any = await candidateApiCalls("patch", profileApiUrlConfig.updateCandidateSkillsUrl, data, true);
    return response.data;
};

export const updateCandidatePreferredJobsProfileApi = async (userId: string,preferredJobs: Array<string>): Promise<any> => {
    let data = {
        id: userId,
        preferredJobs
    }
    const response: any = await candidateApiCalls("patch", profileApiUrlConfig.updateCandidatePreferredJobsUrl, data, true);
    return response.data;
};


export const recruiterGetProfileByCandidateApi = async (userId: string): Promise<any> => {
    try {
		const response: any = await candidateApiCalls("get", profileApiUrlConfig.getRecruiterProfileUrl(userId), userId);
		return response.data;
	} catch (error: any) {
		// console.error(error);
		notify(
			error.response.data.errors[0].message ||
				"An error occurred during job deletion",
			"error"
		);
	}
};