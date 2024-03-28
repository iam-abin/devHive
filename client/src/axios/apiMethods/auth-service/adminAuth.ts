import authApiUrlConfig from "../../../config/apiUrlsConfig/authApiUrlConfig";
import adminApiCalls from "../../admin/apiCalls";

//@dec      Admin login
//@method   POST
export const adminSigninApi = async (data: any): Promise<any> => {
	const response: any = await adminApiCalls(
		"post",
		authApiUrlConfig.signinAdminUrl,
		data
	);
	return response.data;
};

export const adminSignoutApi = async (): Promise<any> => {
	const response: any = await adminApiCalls(
		"post",
		authApiUrlConfig.signoutAdminUrl
	);
	return response.data;
};
