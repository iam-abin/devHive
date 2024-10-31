import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import { IResponse } from "../../../types/api";
import { ISearch } from "../../../types/Job";
import makeApiCall from "../../apiCalls";

export const getAllRecruitersApi = async (page: number, limit: number): Promise<IResponse> => {
	return await makeApiCall(
		"get",
		adminApiUrlConfig.getAllRecruitersUrl(page, limit)
	);
};

export const searchRecruitersApi = async (searchData: ISearch, page: number, limit: number): Promise<IResponse> => {
	return await makeApiCall(
		"get",
		adminApiUrlConfig.searchRecruitersUrl( searchData, page, limit)
	);
};

export const blockUnblockRecruiterApi = async (
	userId: string
): Promise<IResponse> => {
	return await makeApiCall(
		"put",
		adminApiUrlConfig.blockUnblockRecruiterUrl(userId)
	);
};

export const viewRecruiterProfileDetailsApi = async (
	userId: string
): Promise<IResponse> => {
	return await makeApiCall(
		"get",
		adminApiUrlConfig.viewRecruiterProfileDetailsUrl(userId)
	);
};
