
import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import { IResponse } from "../../../types/api";
import adminApiCalls from "../../admin/apiCalls";


export const getAllCardsDetailsApi = async (): Promise<IResponse> => { // for admin from job in admin service
	return await adminApiCalls("get", adminApiUrlConfig.getAllCardsDetailsUrl);
};

export const getGraphDataApi = async (): Promise<IResponse> => { // for admin from job in admin service
	return await adminApiCalls("get", adminApiUrlConfig.getGraphDataUrl);
};