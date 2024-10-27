import paymentApiUrlConfig from "../../../config/apiUrlsConfig/paymentApiUrlConfig";
import { IResponse } from "../../../types/api";
import makeApiCall from "../../apiCalls";


export const createPaymentApi = async (paymentData: any): Promise<IResponse> => {
	return await makeApiCall("post", paymentApiUrlConfig.createPaymentUrl, paymentData);
};
