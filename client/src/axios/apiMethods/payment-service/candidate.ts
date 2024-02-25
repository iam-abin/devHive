import paymentApiUrlConfig from "../../../config/apiUrlsConfig/paymentApiUrlConfig";
import candidateApiCalls from "../../candidate/apiCalls";


export const createPaymentApi = async (paymentData: any): Promise<any> => {
    console.log("iside candidateGetProfileApi ",paymentData);
		const response: any = await candidateApiCalls("post", paymentApiUrlConfig.createPaymentUrl, paymentData);
		console.log("response is ", response.data);
	
		return response.data;
};
