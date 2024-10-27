import authApiUrlConfig from "../../../config/apiUrlsConfig/authApiUrlConfig";
import { IResponse } from "../../../types/api";
import { ISignin } from "../../../types/user";
import makeApiCall from "../../apiCalls";

export const adminSigninApi = async (data: ISignin): Promise<IResponse> => {
	return await makeApiCall(
		"post",
		authApiUrlConfig.signinAdminUrl,
		data
	);
};

export const adminSignoutApi = async (): Promise<IResponse> => {
	return await makeApiCall(
		"post",
		authApiUrlConfig.signoutAdminUrl
	);
};
