import axios from "axios";
import { BASE_URL } from "../../../config/baseUrl";
const BASE_URL_CANDIDATE = `${BASE_URL}/job/candidate`;
const BASE_URL_RECRUITER = `${BASE_URL}/job/recruiter`;


export const getAllJobsApi = async (): Promise<any> => {
    const response = await axios({
        method: "get",
        url: `${BASE_URL_CANDIDATE}`,
    });
    console.log(response);
    
    console.log(response.data);
    return response;
};

export const getAJobApi = async (id: string): Promise<any> => {
    const response = await axios({
        method: "get",
        url: `${BASE_URL_RECRUITER}/${id}`,
    });
    console.log(response);
    
    console.log(response.data);
    return response;
};


export const createJobApi = async (data: any): Promise<any> => {
    const response = await axios({
        method: "post",
        url: `${BASE_URL_RECRUITER}/create`,
        data: data
    });
    console.log(response);
    
    console.log(response.data);
    return response;
};

export const updateJobApi = async (data: any): Promise<any> => {
    console.log("updateJobApi data ",data);
    
    const response = await axios({
        method: "patch",
        url: `${BASE_URL_RECRUITER}/update-job`,
        data: data
    });
    console.log(response);
    
    console.log(response.data);
    return response;
};