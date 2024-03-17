
import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import adminApiCalls from "../../admin/apiCalls";



export const getAllCardsDetailsApi = async (): Promise<any> => { // for admin from job in admin service
    console.log("in all cards details admin api");
		const response: any = await adminApiCalls("get", adminApiUrlConfig.getAllCardsDetailsUrl);
		console.log("response is",response);
	
		return response.data;
};

export const getGraphDataApi = async (): Promise<any> => { // for admin from job in admin service
    console.log("in graph details admin api");
		const response: any = await adminApiCalls("get", adminApiUrlConfig.getGraphDataUrl);
		console.log("response is",response);
	
		return response.data;
};