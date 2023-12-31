import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import adminApiCalls from "../../admin/apiCalls";

export const getAllCandidatesApi = async (): Promise<any> => {
	console.log("getAllCandidatesApi");
	// try {
	const response: any = await adminApiCalls(
		"get",
		adminApiUrlConfig.getAllCandidatesUrl
	);
	console.log("response is", response);
	console.log("response.data is", response.data);

	return response.data;
	// } catch (error) {
	// 	console.log(error);

	// }
};

export const blockUnblockCandidateApi = async (
	userId: string
): Promise<any> => {
	console.log("getAllCandidatesApi");
	// try {
	const response: any = await adminApiCalls(
		"put",
		adminApiUrlConfig.blockUnblockCandidateUrl(userId)
	);
	console.log("response is", response);

	return response.data;
	// } catch (error) {
	// 	console.log(error);

	// }
};

export const viewCandidateProfileDetailsApi = async (
	userId: any
): Promise<any> => {
	// try {
	const response: any = await adminApiCalls(
		"get",
		adminApiUrlConfig.viewCandidateProfileDetailsUrl(userId)
	);
	console.log("response is", response);

	return response.data;
	// } catch (error) {
	// 	console.log(error);

	// }
};
