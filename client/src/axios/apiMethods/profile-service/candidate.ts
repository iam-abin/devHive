
import profileApiUrlConfig from "../../../config/apiUrlsConfig/profileApiUrlConfig";
import candidateApiCalls from "../../candidate/apiCalls";


export const candidateGetProfileApi = async (userId: string): Promise<any> => {
    console.log(userId);
		const response: any = await candidateApiCalls("get", profileApiUrlConfig.getCandidateProfileUrl(userId), userId);
		console.log("response is ", response.data);
	
		return response.data;
};


export const updateCandidateProfileApi = async (candidateProfileData: any): Promise<any> => {
		const response: any = await candidateApiCalls("patch", profileApiUrlConfig.updateCandidateProfileUrl, candidateProfileData);

        console.log(candidateProfileData.userId);
		console.log("response is ", response.data);
	
		return response.data;
};


export const uploadCandidateImageProfileApi = async (userId: string,profileImageData: any): Promise<any> => {
    console.log("uploadCandidateResumeProfileApi profileImageData is    ..//////", profileImageData);
    const response: any = await candidateApiCalls("put", profileApiUrlConfig.uploadCandidateImageUrl, profileImageData, true);

    console.log("response is ", response.data);

    return response.data;
};

export const uploadCandidateResumeProfileApi = async (userId: string,resumeData: any): Promise<any> => {
    console.log("uploadCandidateResumeProfileApi resumeData is    ..//////", resumeData);
    const response: any = await candidateApiCalls("put", profileApiUrlConfig.uploadCandidateResumeUrl, resumeData, true);

    console.log("response is ", response.data);

    return response.data;
};


export const recruiterGetProfileByCandidateApi = async (userId: string): Promise<any> => {
    console.log(userId);

    try {
		const response: any = await candidateApiCalls("get", profileApiUrlConfig.getRecruiterProfileUrl(userId), userId);
		console.log("response is ", response.data);
	
		return response.data;
	} catch (error) {
		console.log(error);
		
	}
};