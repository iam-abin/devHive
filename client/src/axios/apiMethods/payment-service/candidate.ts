import paymentApiUrlConfig from "../../../config/apiUrlsConfig/paymentApiUrlConfig";
import candidateApiCalls from "../../candidate/apiCalls";


export const createPaymentApi = async (paymentData: any): Promise<any> => {
		const response: any = await candidateApiCalls("post", paymentApiUrlConfig.createPaymentUrl, paymentData);
		return response.data;
};
