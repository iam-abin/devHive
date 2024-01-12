import axios, { AxiosError, AxiosInstance } from "axios";
import { candidateAccessToken } from "../../config/localStorage";
import { BASE_URL } from "../../config/baseUrl";
// const maxContentLength = 500 * 1024 * 1024; // 500 MB

export const candidateApi: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	// maxContentLength,
	// maxBodyLength: maxContentLength,
});

// Request interceptor
candidateApi.interceptors.request.use(
	async (config: any) => {
		// Check if the access token is available in local storage
		console.log("inside axios interceptor request.use");

		let tokenString = localStorage.getItem(candidateAccessToken);
		console.log("in request interceptot  localStorage.getItem(candidateAccessToken) is ", tokenString);
		if(tokenString){
			const token = JSON.parse(tokenString)
			// Check if the request is a file upload (multipart/form-data)
			if (config.headers["Content-Type"] && config.headers["Content-Type"].startsWith("multipart/form-data")) {
				// Add additional headers for file upload
				console.log('in api.js Content-Type multipart/form-data')
				config.headers = {
					...config.headers,
					"Authorization": `Bearer ${token}`, // Add authorization header for file upload
				};
			}else{
				console.log('in api.js no Content-Type multipart/form-data')

				config.headers["Authorization"] = `Bearer ${token}`
			}
			
		}

		return config;
	},
	(error: AxiosError) => {
        return Promise.reject(error);
      }
);
