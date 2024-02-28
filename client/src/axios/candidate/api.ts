import axios, { AxiosError, AxiosInstance } from "axios";
import { candidateAccessToken } from "../../config/localStorage";
import { BASE_URL } from "../../config/baseUrl";

export const candidateApi: AxiosInstance = axios.create({
	baseURL: BASE_URL,
});

// Request interceptor
candidateApi.interceptors.request.use(
	async (config: any) => {
	  console.log("inside axios interceptor request.use");
	  let tokenString = localStorage.getItem(candidateAccessToken);
	  console.log(
		"in request interceptor localStorage.getItem(candidateAccessToken) is ",
		tokenString
	  );
  
	  if (tokenString) {
		console.log(";;;;;;;", tokenString);
  
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
  