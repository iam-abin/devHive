import axios from "axios";
import {
	recruiterAccessToken,
	recruiterRefreshToken,
} from "../../config/localStorage";
import { recruiterApi } from "./api";
import { BASE_URL } from "../../config/baseUrl";

const recruiterApiCalls = async (
	method: string,
	url: string,
	data?: any,
	isFileUpload?: boolean
) => {
	try {
		let response;
		switch (method.toLowerCase()) {
			case "get":
				response = await recruiterApi.get(url, data);
				break;

			case "post":
				response = await recruiterApi.post(url, data);
				console.log("inside post response", response);
				break;

			case "put":
				response = isFileUpload
					? await recruiterApi.put(url, data, {
							headers: { "Content-Type": "multipart/form-data" },
					  })
					: await recruiterApi.put(url, data);
				break;

			case "patch":
				response = await recruiterApi.patch(url, data);
				break;

			case "delete":
				response = await recruiterApi.delete(url, data);
				break;

			default:
				throw new Error(`Invalid method: ${method}`);
		}

		console.log("in apiCalls response ", response);
		return response;
	} catch (error) {
		console.error("API call failed:", error);
		throw error;
	}
};


// Axios response interceptor
recruiterApi.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		console.log("error =======", error);

		if (error?.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const newAccessToken = await refreshToken();

				if (newAccessToken) {
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					return recruiterApi(originalRequest);
				}
			} catch (refreshError) {
				console.error("Refresh token failed:", refreshError);
				clearRecruiterFromLocal();
			}
		}
		return Promise.reject(error);
	}
);

const refreshToken = async () => {
	const refreshTokenString: any = localStorage.getItem(recruiterRefreshToken);
	try {
		const refreshTokenObject = JSON.parse(refreshTokenString);

		const response = await axios.post(
			`${BASE_URL}/auth/jwt-refresh/refreshToken`,
			null,
			{
				headers: {
					Authorization: `Bearer ${refreshTokenObject}`,
				},
			}
		);

		if (response.data.accessToken) {
			const newAccessToken = response.data.accessToken;
			localStorage.setItem(recruiterAccessToken, newAccessToken);
			return response.data.accessToken;
		}
	} catch (error) {
		console.error("Failed to refresh token", error);
		clearRecruiterFromLocal();
	}
	return null;
};


function clearRecruiterFromLocal() {
	localStorage.removeItem(recruiterAccessToken);
	localStorage.removeItem(recruiterRefreshToken);
}

export default recruiterApiCalls;