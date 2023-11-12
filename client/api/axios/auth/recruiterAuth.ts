import axios from "axios";
import { BASE_URL } from "../../../src/config/baseUrl";

const BASE_URL_RECRUITER = `${BASE_URL}/auth/recruiter`;

export const recruiterSigninApi = async (data: any): Promise<any> => {
		const response = await axios({
			method: "post",
			url: `${BASE_URL_RECRUITER}/signin`,
			data: data,
		});
		return response;
};


export const recruiterSignupApi = async (data: any): Promise<any> => {
	try {
		const response = await axios({
			method: "post",
			url: `${BASE_URL_RECRUITER}/signup`,
			data: data,
		});
		return response;
	} catch (error: any) {
		console.log(error, "signup axios api 1234");
		throw new Error(error);
	}
};