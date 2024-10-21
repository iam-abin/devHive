import paymentApiUrlConfig from "../../../config/apiUrlsConfig/paymentApiUrlConfig";
import { IResponse } from "../../../types/api";
import candidateApiCalls from "../../candidate/apiCalls";


export const createPaymentApi = async (paymentData: any): Promise<IResponse> => {
	return await candidateApiCalls("post", paymentApiUrlConfig.createPaymentUrl, paymentData);
};
