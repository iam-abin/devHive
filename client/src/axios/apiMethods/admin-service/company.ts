
import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import adminApiCalls from "../../admin/apiCalls";




export const getAllCompaniesApi = async (): Promise<any> => {
	const response: any = await adminApiCalls("get", adminApiUrlConfig.getAllCompaniesUrl);
	return response.data;
};

export const blockUnblockCompanyApi = async (id: string): Promise<any> => {
	const response: any = await adminApiCalls("get", adminApiUrlConfig.blockUnblockCompanyUrl(id));
	return response.data;
};