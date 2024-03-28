import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import adminApiCalls from "../../admin/apiCalls";

export const getAllRecruitersApi = async (): Promise<any> => {
	const response: any = await adminApiCalls(
		"get",
		adminApiUrlConfig.getAllRecruitersUrl
	);
	return response.data;
};

export const blockUnblockRecruiterApi = async (
	userId: string
): Promise<any> => {
	const response: any = await adminApiCalls(
		"put",
		adminApiUrlConfig.blockUnblockRecruiterUrl(userId)
	);

	return response.data;
};

export const viewRecruiterProfileDetailsApi = async (
	userId: any
): Promise<any> => {
	const response: any = await adminApiCalls(
		"get",
		adminApiUrlConfig.viewRecruiterProfileDetailsUrl(userId)
	);
	return response.data;
};
