import axios from "axios";
import { BASE_URL } from "../../../config/baseUrl";

const BASE_URL_ADMIN = `${BASE_URL}/auth/admin`;

export const adminSigninApi = async (data: any): Promise<any> => {
		const response = await axios({
			method: "post",
			url: `${BASE_URL_ADMIN}/signin`,
			data: data,
		});
		console.log("response is",response.data);
		
		return response.data;
};
