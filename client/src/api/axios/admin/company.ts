import axios from "axios";
import { BASE_URL } from "../../../config/baseUrl";

const BASE_URL_ADMIN = `${BASE_URL}/admin/company`;

export const getAllCompaniesApi = async (): Promise<any> => {
    console.log("getAllCompaniesApi");
    
		const response = await axios({
			method: "get",
			url: `${BASE_URL_ADMIN}`
		});
        console.log("response", response);
        
		return response;
};

export const blockUnblockCompanyApi = async (id: string): Promise<any> => {
    const response = await axios({
        method: "put",
        url: `${BASE_URL_ADMIN}/company/blockUnblock/${id}`
    });
    console.log(response);
    
    return response;
};