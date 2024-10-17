import axios from "axios";
import {
	candidateAccessToken,
	candidateRefreshToken,
} from "../../config/localStorage";
import { candidateApi } from "./api";
import { BASE_URL } from "../../config/baseUrl";
import { notify } from "../../utils/toastMessage";

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
		return response;
	} catch (error: any) {
		notify(error.response.data.errors[0].message, "error");
	}
};

// Axios response interceptor
candidateApi.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error?.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const newAccessToken = await refreshToken();

				if (newAccessToken) {
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					return candidateApi(originalRequest);
				}
			} catch (error: any) {
				notify(error.response.data.errors[0].message, "error");
				// clearCandidateFromLocal();
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
	} catch (error: any) {
		notify(error.response.data.errors[0].message, "error");
		console.error("Failed to refresh token", error);
		// clearCandidateFromLocal(); // never call it
	}
	return null;
};


// function clearCandidateFromLocal() {
// 	localStorage.removeItem(candidateAccessToken);
// 	localStorage.removeItem(candidateRefreshToken);
// }

export default candidateApiCalls;