import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import adminApiCalls from "../../admin/apiCalls";

export const getAllCandidatesApi = async (): Promise<any> => {
	const response: any = await adminApiCalls(
		"get",
		adminApiUrlConfig.getAllCandidatesUrl
	);
	return response.data;
};

export const blockUnblockCandidateApi = async (
	userId: string
): Promise<any> => {
	const response: any = await adminApiCalls(
		"put",
		adminApiUrlConfig.blockUnblockCandidateUrl(userId)
	);
	return response.data;
};

export const viewCandidateProfileDetailsApi = async (
	userId: any
): Promise<any> => {
	const response: any = await adminApiCalls(
		"get",
		adminApiUrlConfig.viewCandidateProfileDetailsUrl(userId)
	);
	return response.data;
};
