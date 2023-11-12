import axios from "axios";
import { BASE_URL } from "../../../src/config/baseUrl";

const BASE_URL_CANDIDATE = `${BASE_URL}/auth/candidate`;

export const candidateLoginApi = async (data: any): Promise<any> => {
	try {
		const response = await axios({
			method: "post",
			url: `${BASE_URL_CANDIDATE}/signin`,
			data: data,
		});
        console.log(response);
        
		return response;
	} catch (error) {
		console.log(error, "signin axios api 1234");
		throw new Error(error.response.data.message);
	}
};


export const candidateSignupApi = async (data: any): Promise<any> => {
	try {
		const response = await axios({
			method: "post",
			url: `${BASE_URL_CANDIDATE}/signup`,
			data: data,
		});
		return response;
	} catch (error) {
		console.log(error, "signup axios api 1234");
		throw new Error(error.response.data.message);
	}
};