import axios from "axios";
import { BASE_URL } from "../../../config/baseUrl";

const BASE_URL_RECRUITER = `${BASE_URL}/profile/recruiter`;


export const recruiterGetProfileApi = async (userId: string): Promise<any> => {
    const response = await axios({
        method: "get",
        url: `${BASE_URL_RECRUITER}/viewProfile/${userId}`,
    });
    console.log(userId);
    
    console.log(response.data);
    
    return response;
};

