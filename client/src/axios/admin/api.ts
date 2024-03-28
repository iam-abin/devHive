import axios, { AxiosError, AxiosInstance } from "axios";
import { adminAccessToken } from "../../config/localStorage";
import { BASE_URL } from "../../config/baseUrl";

export const adminApi: AxiosInstance = axios.create({
	baseURL: BASE_URL,
});

// Request interceptor
adminApi.interceptors.request.use(
	async (config: any) => {
		let tokenString = localStorage.getItem(adminAccessToken);
		
		if (tokenString) {
			// const token = JSON.parse(tokenString);
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
