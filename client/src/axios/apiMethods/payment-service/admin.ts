import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import adminApiCalls from "../../admin/apiCalls";


export const getAllPaymentsApi = async (paymentData: any): Promise<any> => {
    console.log("iside candidateGetProfileApi ",paymentData);
		const response: any = await adminApiCalls("get", adminApiUrlConfig.getAllPaymentsUrl);
		console.log("response is ", response.data);
	
		return response.data;
};
