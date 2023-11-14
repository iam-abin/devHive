import axios from "axios";
import { BASE_URL } from "../../../config/baseUrl";

const BASE_URL_RECRUITER = `${BASE_URL}/admin/recruiter`;

export const getAllRecruitersApi = async (): Promise<any> => {
		const response = await axios({
			method: "get",
			url: `${BASE_URL_RECRUITER}/recruiters`
		});
        // console.log(response);
        
		return response;
};

export const blockUnblockRecruiterApi = async (id: string): Promise<any> => {
    const response = await axios({
        method: "put",
        url: `${BASE_URL_RECRUITER}/blockUnblock/${id}`
    });
    console.log(response);
    
    return response;
};