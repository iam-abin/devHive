
import profileApiUrlConfig from "../../../config/apiUrlsConfig/profileApiUrlConfig";
import { IResponse } from "../../../types/api";
import makeApiCall from "../../apiCalls";


export const recruiterGetProfileApi = async (userId: string): Promise<IResponse> => {
	return await makeApiCall("get", profileApiUrlConfig.getgetRecruiterProfileUrl(userId), userId);
};


export const updateRecruiterProfileApi = async (recruiterProfileData: any): Promise<IResponse> => {
	return await makeApiCall("patch", profileApiUrlConfig.updategetRecruiterProfileUrl, recruiterProfileData);
};

export const getACandidateProfileApi = async (userId: string): Promise<IResponse> => {
	return await makeApiCall("get", profileApiUrlConfig.getACandidateProfileUrl(userId));
};

export const getAllCandidatesProfilesApi = async (page: number): Promise<IResponse> => {
	return await makeApiCall("get", profileApiUrlConfig.getAllCandidatesProfilesUrl(page));
};
