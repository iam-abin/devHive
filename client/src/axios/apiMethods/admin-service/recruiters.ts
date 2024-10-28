import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import { IResponse } from "../../../types/api";
import makeApiCall from "../../apiCalls";

export const getAllRecruitersApi = async (page: number, limit: number): Promise<IResponse> => {
	return await makeApiCall(
		"get",
		adminApiUrlConfig.getAllRecruitersUrl(page, limit)
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
