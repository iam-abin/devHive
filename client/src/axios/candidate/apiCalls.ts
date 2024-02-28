import axios from "axios";
import {
	candidateAccessToken,
	candidateRefreshToken,
} from "../../config/localStorage";
import { candidateApi } from "./api";
import { BASE_URL } from "../../config/baseUrl";

const candidateApiCalls = async (
	method: string,
	url: string,
	data?: any,
	isFileUpload?: boolean
) => {
	try {
		let response;
		switch (method.toLowerCase()) {
			case "get":
				response = await candidateApi.get(url, data);
				break;

			case "post":
				response = await candidateApi.post(url, data);
				console.log("inside post response", response);
				break;

			case "put":
				response = isFileUpload
					? await candidateApi.put(url, data, {
							headers: { "Content-Type": "multipart/form-data" },
					  })
					: await candidateApi.put(url, data);
				break;

			case "patch":
				response = await candidateApi.patch(url, data);
				break;

			case "delete":
				response = await candidateApi.delete(url, data);
				break;

			default:
				throw new Error(`Invalid method: ${method}`);
		}

		console.log("in apiCalls response ", response);
		console.log("in apiCalls response.data ", response.data);
		return response;
	} catch (error) {
		console.error("API call failed:", error);
		throw error;
	}
};

// Axios response interceptor
candidateApi.interceptors.response.use(
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
					return candidateApi(originalRequest);
				}
			} catch (refreshError) {
				console.error("Refresh token failed:", refreshError);
				clearCandidateFromLocal();
			}
		}
		return Promise.reject(error);
	}
);

const refreshToken = async () => {
	const refreshTokenString: any = localStorage.getItem(candidateRefreshToken);
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
			localStorage.setItem(candidateAccessToken, newAccessToken);
			return response.data.accessToken;
		}
	} catch (error) {
		console.error("Failed to refresh token", error);
		clearCandidateFromLocal();
	}
	return null;
};

export default candidateApiCalls;


function clearCandidateFromLocal() {
	localStorage.removeItem(candidateAccessToken);
	localStorage.removeItem(candidateRefreshToken);
}
