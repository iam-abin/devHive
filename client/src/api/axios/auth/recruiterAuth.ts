import axios from "axios";
import { BASE_URL } from "../../../config/baseUrl";

const BASE_URL_RECRUITER = `${BASE_URL}/auth/recruiter`;

export const recruiterSigninApi = async (data: any): Promise<any> => {
	console.log("in recruiter signin api");
	
		const response = await axios({
			method: "post",
			url: `${BASE_URL_RECRUITER}/signin`,
			data: data,
		});
		return response;
};


export const recruiterSignupApi = async (data: any): Promise<any> => {
		const response = await axios({
			method: "post",
			url: `${BASE_URL_RECRUITER}/signup`,
			data: data,
		});
		return response;
};