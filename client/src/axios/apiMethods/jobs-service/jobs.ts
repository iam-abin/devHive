
import jobApiUrlConfig from "../../../config/apiUrlsConfig/jobApiUrlConfig";
import candidateApiCalls from "../../candidate/apiCalls";
import recruiterApiCalls from "../../recruiter/apiCalls";



export const getAllJobsApi = async (): Promise<any> => {
    // try {
		const response: any = await candidateApiCalls("get", jobApiUrlConfig.getAllJobsUrl);
		console.log("response is",response.data);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

    // const response = await axios({
    //     method: "get",
    //     url: `${BASE_URL_CANDIDATE}`,
    // });
    // console.log(response);
    
    // console.log(response.data);
    // return response;
};

export const getAllRecruiterAddedJobsApi = async (recruiterId: string): Promise<any> => {
    // try {
		const response: any = await recruiterApiCalls("get", jobApiUrlConfig.getAllRecruiterAddedJobsUrl(recruiterId));
		console.log("response is",response.data);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

    // const response = await axios({
    //     method: "get",
    //     url: `${BASE_URL_RECRUITER}/created-jobs/${recruiterId}`,
    // });
    // console.log(response);
    
    // console.log(response.data);
    // return response;
};


export const getAJobApi = async (id: string): Promise<any> => {
    // try {
		const response: any = await recruiterApiCalls("get", jobApiUrlConfig.getAJobUrl(id));
		console.log("response is",response.data);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

    // const response = await axios({
    //     method: "get",
    //     url: `${BASE_URL_RECRUITER}/${id}`,
    // });
    // console.log(response);
    
    // console.log(response.data);
    // return response;
};


export const createJobApi = async (data: any): Promise<any> => {
    // try {
		const response: any = await recruiterApiCalls("post", jobApiUrlConfig.createJobUrl, data);
		console.log("response is",response.data);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

    // const response = await axios({
    //     method: "post",
    //     url: `${BASE_URL_RECRUITER}/create`,
    //     data: data
    // });
    // console.log(response);
    
    // console.log(response.data);
    // return response;
};

export const updateJobApi = async (data: any): Promise<any> => {
    console.log("updateJobApi data ",data);
    // try {
		const response: any = await recruiterApiCalls("patch", jobApiUrlConfig.updateJobUrl, data);
        console.log("response is",response);
		console.log("response data is",response.data);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }
    
    // const response = await axios({
    //     method: "patch",
    //     url: `${BASE_URL_RECRUITER}/update-job`,
    //     data: data
    // });
    // console.log(response);
    
    // console.log(response.data);
    // return response;
};