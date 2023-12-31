
import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import adminApiCalls from "../../admin/apiCalls";




export const getAllCompaniesApi = async (): Promise<any> => {
    console.log("getAllCompaniesApi");
    // try {
		const response: any = await adminApiCalls("get", adminApiUrlConfig.getAllCompaniesUrl);
		console.log("response is",response);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }
    
		// const response = await axios({
		// 	method: "get",
		// 	url: `${BASE_URL_ADMIN}`
		// });
        // console.log("response", response);
        
		// return response;
};

export const blockUnblockCompanyApi = async (id: string): Promise<any> => {
    // try {
		const response: any = await adminApiCalls("get", adminApiUrlConfig.blockUnblockCompanyUrl(id));
		console.log("response is",response);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

    // const response = await axios({
    //     method: "put",
    //     url: `${BASE_URL_ADMIN}/company/blockUnblock/${id}`
    // });
    // console.log(response);
    
    // return response;
};