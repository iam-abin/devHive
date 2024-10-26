import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import { IResponse } from "../../../types/api";
import adminApiCalls from "../../admin/apiCalls";

export const getAllRecruitersApi = async (page: number, limit: number): Promise<IResponse> => {
	return await adminApiCalls(
		"get",
		adminApiUrlConfig.getAllRecruitersUrl(page, limit)
	);
};

export const blockUnblockRecruiterApi = async (
	userId: string
): Promise<IResponse> => {
	return await adminApiCalls(
		"put",
		adminApiUrlConfig.blockUnblockRecruiterUrl(userId)
	);
};

export const viewRecruiterProfileDetailsApi = async (
	userId: string
): Promise<IResponse> => {
	return await adminApiCalls(
		"get",
		adminApiUrlConfig.viewRecruiterProfileDetailsUrl(userId)
	);
};
