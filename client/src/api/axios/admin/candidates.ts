import axios from "axios";
import { BASE_URL } from "../../../config/baseUrl";

const BASE_URL_CANDIDATE = `${BASE_URL}/admin/candidate`;

export const getAllCandidatesApi = async (): Promise<any> => {
    console.log("getAllCandidatesApi");
    
		const response = await axios({
			method: "get",
			url: `${BASE_URL_CANDIDATE}/candidates`
		});
        console.log("response", response);
        
		return response;
};

export const blockUnblockCandidateApi = async (userId: string): Promise<any> => {
    const response = await axios({
        method: "get",
        url: `${BASE_URL_CANDIDATE}/viewProfile/${userId}`
    });
    console.log(response);
    
    return response;
};

export const viewCandidateProfileDetailsApi = async (userId: any): Promise<any> => {
    const response = await axios({
        method: "get",
        url: `${BASE_URL_CANDIDATE}/viewProfile/${userId}`  
    });
    console.log(response);
    
    return response;
};