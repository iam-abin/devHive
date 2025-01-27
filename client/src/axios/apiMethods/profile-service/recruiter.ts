
import profileApiUrlConfig from "../../../config/apiUrlsConfig/profileApiUrlConfig";
import { IResponse } from "../../../types/api";
import { IRecruiterProfile } from "../../../types/profile";
import makeApiCall from "../../apiCalls";


export const recruiterGetProfileApi = async (): Promise<IResponse> => {
	return await makeApiCall("get", profileApiUrlConfig.getRecruiterProfileUrl);
};

export const updateRecruiterProfileApi = async (recruiterProfileData: Partial<IRecruiterProfile>): Promise<IResponse> => {
	return await makeApiCall("patch", profileApiUrlConfig.updategetRecruiterProfileUrl, recruiterProfileData);
};

export const getACandidateProfileApi = async (userId: string): Promise<IResponse> => {
	return await makeApiCall("get", profileApiUrlConfig.getACandidateProfileUrl(userId));
};

export const getAllCandidatesProfilesApi = async (page: number, limit: number): Promise<IResponse> => {
	return await makeApiCall("get", profileApiUrlConfig.getAllCandidatesProfilesUrl(page, limit));
};
