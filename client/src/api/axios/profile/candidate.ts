import axios from "axios";
import { BASE_URL } from "../../../config/baseUrl";

const BASE_URL_CANDIDATE = `${BASE_URL}/profile/candidate`;


export const candidateGetProfileApi = async (candidateId: string): Promise<any> => {
    const response = await axios({
        method: "get",
        url: `${BASE_URL_CANDIDATE}/viewProfile/${candidateId}`,
    });
    console.log(candidateId);
    
    console.log(response.data);
    
    return response;
};

