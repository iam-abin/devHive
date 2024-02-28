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
	console.log("response is", response.data);

	return response.data;
};

export const adminSignoutApi = async (): Promise<any> => {
	// try {
	const response: any = await adminApiCalls(
		"post",
		authApiUrlConfig.signoutAdminUrl
	);
	console.log("response is", response.data);

	return response.data;
	// } catch (error) {
	// 	console.log(error);

	// }

	// const response = await axios({
	// 	method: "post",
	// 	url: `${BASE_URL_ADMIN}/signout`
	// });
	// console.log("response is",response.data);

	// return response.data;
};
