import authApiUrlConfig from "../../../config/apiUrlsConfig/authApiUrlConfig";
import { IResponse } from "../../../types/api";
import { ISignin } from "../../../types/user";
import adminApiCalls from "../../admin/apiCalls";

export const adminSigninApi = async (data: ISignin): Promise<IResponse> => {
	return await adminApiCalls(
		"post",
		authApiUrlConfig.signinAdminUrl,
		data
	);
};

export const adminSignoutApi = async (): Promise<IResponse> => {
	return await adminApiCalls(
		"post",
		authApiUrlConfig.signoutAdminUrl
	);
};
