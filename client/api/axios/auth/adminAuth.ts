import axios from "axios";
import { BASE_URL } from "../../../src/config/baseUrl";

const BASE_URL_ADMIN = `${BASE_URL}/auth/admin`;

export const adminLoginApi = async (data: any): Promise<any> => {
	try {
		const response = await axios({
			method: "post",
			url: `${BASE_URL_ADMIN}/signin`,
			data: data,
		});
		return response;
	} catch (error) {
		console.log(error, "signin axios api 1234");
		throw new Error(error.response.data.message);
	}
};
