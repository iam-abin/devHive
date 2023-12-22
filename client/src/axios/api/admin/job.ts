import axios from "axios";
import { BASE_URL } from "../../../config/baseUrl";

const BASE_URL_RECRUITER = `${BASE_URL}/admin/job`;

const BASE_URL_ADMIN = `${BASE_URL}/admin/job`;

export const getAllJobsApi = async (): Promise<any> => {
    console.log("in all jobs api");

		const response = await axios({
			method: "get",
			url: `${BASE_URL_RECRUITER}/jobs`
		});
        // console.log(response);
        
		return response;
};

export const getAllJobsAdminApi = async (): Promise<any> => {
    console.log("in all jobs admin api");

		const response = await axios({
			method: "get",
			url: `${BASE_URL_ADMIN}/jobs`
		});
        // console.log(response);
        
		return response;
};

export const blockUnblockJobApi = async (jobId: string): Promise<any> => {
    const response = await axios({
        method: "put",
        url: `${BASE_URL_RECRUITER}/blockUnblock/${jobId}`
    });
    console.log(response);
    
    return response;
};

export const viewJobDetailsApi = async (jobId: any): Promise<any> => {
    
    const response = await axios({
        method: "get",
        url: `${BASE_URL_RECRUITER}/viewJob/${jobId}`  
    });
    console.log(response);
    
    return response;
};