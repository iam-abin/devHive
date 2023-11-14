import axios from "axios";
import { BASE_URL } from "../../../config/baseUrl";

const BASE_URL_CANDIDATE = `${BASE_URL}/admin/candidate`;

export const getAllCandidatesApi = async (): Promise<any> => {
		const response = await axios({
			method: "get",
			url: `${BASE_URL_CANDIDATE}/candidates`
		});
        // console.log(response);
        
		return response;
};

export const blockUnblockCandidateApi = async (id: string): Promise<any> => {
    const response = await axios({
        method: "put",
        url: `${BASE_URL_CANDIDATE}/blockUnblock/${id}`
    });
    console.log(response);
    
    return response;
};