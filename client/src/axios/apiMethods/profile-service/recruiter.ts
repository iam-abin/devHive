
import profileApiUrlConfig from "../../../config/apiUrlsConfig/profileApiUrlConfig";
import recruiterApiCalls from "../../recruiter/apiCalls";


export const recruiterGetProfileApi = async (userId: string): Promise<any> => {
	const response: any = await recruiterApiCalls("get", profileApiUrlConfig.getgetRecruiterProfileUrl(userId), userId);
	return response.data;
};


export const updateRecruiterProfileApi = async (recruiterProfileData: any): Promise<any> => {
	const response: any = await recruiterApiCalls("patch", profileApiUrlConfig.updategetRecruiterProfileUrl, recruiterProfileData);
	return response.data;
};

export const getACandidateProfileApi = async (userId: any): Promise<any> => {
	const response: any = await recruiterApiCalls("get", profileApiUrlConfig.getACandidateProfileUrl(userId));
	return response.data;
};

export const getAllCandidatesProfilesApi = async (page: any): Promise<any> => {
	const response: any = await recruiterApiCalls("get", profileApiUrlConfig.getAllCandidatesProfilesUrl(page));
	return response.data;
};
