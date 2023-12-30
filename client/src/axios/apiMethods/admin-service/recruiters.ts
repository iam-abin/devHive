
import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import adminApiCalls from "../../admin/apiCalls";




export const getAllRecruitersApi = async (): Promise<any> => {
    // try {
		const response: any = await adminApiCalls("get", adminApiUrlConfig.getAllRecruitersUrl);
		console.log("response is",response.data);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

		// const response = await axios({
		// 	method: "get",
		// 	url: `${BASE_URL_RECRUITER}/recruiters`
		// });
        // // console.log(response);
        
		// return response;
};

export const blockUnblockRecruiterApi = async (userId: string): Promise<any> => {
    // try {
		const response: any = await adminApiCalls("put", adminApiUrlConfig.blockUnblockRecruiterUrl(userId));
		console.log("response is",response);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

    // const response = await axios({
    //     method: "put",
    //     url: `${BASE_URL_RECRUITER}/blockUnblock/${userId}`
    // });
    // console.log(response);
    
    // return response;
};

export const viewRecruiterProfileDetailsApi = async (userId: any): Promise<any> => {
    // try {
		const response: any = await adminApiCalls("get", adminApiUrlConfig.viewRecruiterProfileDetailsUrl(userId));
		console.log("response is",response);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

    // const response = await axios({
    //     method: "get",
    //     url: `${BASE_URL_RECRUITER}/viewProfile/${userId}`  
    // });
    // console.log(response);
    
    // return response;
};