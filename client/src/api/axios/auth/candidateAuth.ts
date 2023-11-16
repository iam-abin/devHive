import axios from "axios";
import { BASE_URL } from "../../../config/baseUrl";

const BASE_URL_CANDIDATE = `${BASE_URL}/auth/candidate`;

export const candidateSigninApi = async (data: any): Promise<any> => {
		const response = await axios({
			method: "post",
			url: `${BASE_URL_CANDIDATE}/signin`,
			data: data,
		});
        console.log(response);
        
		return response;
};


export const candidateSignupApi = async (data: any): Promise<any> => {
		const response = await axios({
			method: "post",
			url: `${BASE_URL_CANDIDATE}/signup`,
			data: data,
		});
		return response;
};

export const emailVerifyApi = async (url: string): Promise<any> => {
	const response = await axios({
		method: "post",
		url: url,
	});
	return response;
};

