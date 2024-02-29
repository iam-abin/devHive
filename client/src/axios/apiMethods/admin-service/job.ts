
import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import jobApiUrlConfig from "../../../config/apiUrlsConfig/jobApiUrlConfig";
import adminApiCalls from "../../admin/apiCalls";
// import recruiterApiCalls from "../../recruiter/apiCalls";




// export const getAllJobsApi = async (): Promise<any> => { // for recruiter and candidate from job service
    
//     console.log("in all jobs api");
//     try {
// 		const response: any = await recruiterApiCalls("get", jobApiUrlConfig.getAllJobsUrl);
// 		console.log("response is",response);
	
// 		return response;
// 	} catch (error) {
// 		console.log(error);
		
// 	}

//     // console.log("in all jobs api");

// 	// 	const response = await axios({
// 	// 		method: "get",
// 	// 		url: `${BASE_URL_RECRUITER}/jobs`
// 	// 	});
//     //     // console.log(response);
        
// 	// 	return response;
// };

export const getAllJobsAdminApi = async (): Promise<any> => { // for admin from job in admin service
    console.log("in all jobs admin api");
    // try {
		const response: any = await adminApiCalls("get", adminApiUrlConfig.getAllJobsUrl);
		console.log("response is",response);
	
		return response.data;
};

export const blockUnblockJobApi = async (jobId: string): Promise<any> => {
    // try {
		const response: any = await adminApiCalls("put", adminApiUrlConfig.blockUnblockJobUrl(jobId));
		console.log("response is",response);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }


    // const response = await axios({
    //     method: "put",
    //     url: `${BASE_URL_RECRUITER}/blockUnblock/${jobId}`
    // });
    // console.log(response);
    
    // return response;
};

export const viewJobDetailsApi = async (jobId: any): Promise<any> => {
    // try {
		const response: any = await adminApiCalls("get", jobApiUrlConfig.getAJobUrl(jobId));
		console.log("response is",response);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }
    
    // const response = await axios({
    //     method: "get",
    //     url: `${BASE_URL_RECRUITER}/viewJob/${jobId}`  
    // });
    // console.log(response);
    
    // return response;
};