import axios, { AxiosError, AxiosInstance } from "axios";
import { recruiterAccessToken } from "../../config/localStorage";
import { BASE_URL } from "../../config/baseUrl";

export const recruiterApi: AxiosInstance = axios.create({
	baseURL: BASE_URL,
});

// Request interceptor
recruiterApi.interceptors.request.use(
	async (config: any) => {
		let tokenString = localStorage.getItem(recruiterAccessToken);
		if (tokenString) {
			// const token = JSON.parse(tokenString)
			// No need to parse if the token is already a string
			const token = tokenString;
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);
