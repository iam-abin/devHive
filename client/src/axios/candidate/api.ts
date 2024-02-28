import axios, { AxiosError, AxiosInstance } from "axios";
import { candidateAccessToken } from "../../config/localStorage";
import { BASE_URL } from "../../config/baseUrl";

export const candidateApi: AxiosInstance = axios.create({
	baseURL: BASE_URL,
});

// Request interceptor
candidateApi.interceptors.request.use(
	async (config: any) => {
	  let tokenString = localStorage.getItem(candidateAccessToken);
	  console.log(
		"in axios request interceptor localStorage.getItem(candidateAccessToken) is ",
		tokenString
	  );
  
	  if (tokenString) {
		// No need to parse if the token is already a string
		const token = tokenString;
  
		if (
		  config.headers["Content-Type"] &&
		  config.headers["Content-Type"].startsWith("multipart/form-data")
		) {
		  config.headers = {
			...config.headers,
			Authorization: `Bearer ${token}`,
		  };
		} else {
		  config.headers["Authorization"] = `Bearer ${token}`;
		}
	  }
  
	  return config;
	},
	(error: AxiosError) => {
	  return Promise.reject(error);
	}
  );