import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import adminApiCalls from "../../admin/apiCalls";


export const getAllPaymentsApi = async (): Promise<any> => {
		const response: any = await adminApiCalls("get", adminApiUrlConfig.getAllPaymentsUrl);
		console.log("response is ", response.data);
	
		return response.data;
};
