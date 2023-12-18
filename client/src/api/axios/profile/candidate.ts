import axios from "axios";
import { BASE_URL } from "../../../config/baseUrl";

const BASE_URL_CANDIDATE = `${BASE_URL}/profile/candidate`;


export const candidateGetProfileApi = async (userId: string): Promise<any> => {
    console.log(userId);
    const response = await axios({
        method: "get",
        url: `${BASE_URL_CANDIDATE}/viewProfile/${userId}`,
    });
    
    console.log(response.data);
    
    return response;
};

