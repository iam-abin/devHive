
import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import adminApiCalls from "../../admin/apiCalls";



export const getAllCardsDetailsApi = async (): Promise<any> => { // for admin from job in admin service
	const response: any = await adminApiCalls("get", adminApiUrlConfig.getAllCardsDetailsUrl);
	return response.data;
};

export const getGraphDataApi = async (): Promise<any> => { // for admin from job in admin service
	const response: any = await adminApiCalls("get", adminApiUrlConfig.getGraphDataUrl);
	return response.data;
};