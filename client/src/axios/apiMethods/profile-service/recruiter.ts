
import profileApiUrlConfig from "../../../config/apiUrlsConfig/profileApiUrlConfig";
import { IResponse } from "../../../types/api";
import recruiterApiCalls from "../../recruiter/apiCalls";


export const recruiterGetProfileApi = async (userId: string): Promise<IResponse> => {
	return await recruiterApiCalls("get", profileApiUrlConfig.getgetRecruiterProfileUrl(userId), userId);
};


export const updateRecruiterProfileApi = async (recruiterProfileData: any): Promise<IResponse> => {
	return await recruiterApiCalls("patch", profileApiUrlConfig.updategetRecruiterProfileUrl, recruiterProfileData);
};

export const getACandidateProfileApi = async (userId: string): Promise<IResponse> => {
	return await recruiterApiCalls("get", profileApiUrlConfig.getACandidateProfileUrl(userId));
};

export const getAllCandidatesProfilesApi = async (page: number): Promise<IResponse> => {
	return await recruiterApiCalls("get", profileApiUrlConfig.getAllCandidatesProfilesUrl(page));
};
