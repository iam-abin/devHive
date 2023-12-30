import axios, { AxiosError, AxiosInstance } from "axios";
import { recruiterAccessToken } from "../../config/localStorage";
import { BASE_URL } from "../../config/baseUrl";

export const recruiterApi: AxiosInstance = axios.create({
	baseURL: BASE_URL,
});

// Request interceptor
recruiterApi.interceptors.request.use(
	async (config: any) => {
		// Check if the access token is available in local storage
		console.log("inside axios interceptor request.use");
		let tokenString = localStorage.getItem(recruiterAccessToken);
		console.log("in request interceptot  localStorage.getItem(recruiterAccessToken) is ", tokenString);
		if(tokenString){
			const token = JSON.parse(tokenString)
			config.headers["Authorization"] = `Bearer ${token}`
		}
		return config;
	},
	(error: AxiosError) => {
        return Promise.reject(error);
      }
);
