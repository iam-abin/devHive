import axios from "axios";
import { adminAccessToken, adminRefreshToken } from "../../config/localStorage";
import { adminApi } from "./api";
import { BASE_URL } from "../../config/baseUrl";

const adminApiCalls = async (method: string, url: string, data?: any) => {
	try {
		let response;
		switch (method.toLowerCase()) {
			case "get":
				response = await adminApi.get(url, data);
				break;

			case "post":
				response = await adminApi.post(url, data);
				break;

			case "put":
				response = await adminApi.put(url, data);
				break;

			case "patch":
				response = await adminApi.patch(url, data);
				break;

			case "delete":
				response = await adminApi.delete(url, data);
				break;

			default:
				throw new Error(`Invalid method: ${method}`);
		}

		return response;
	} catch (error) {
		console.error("API call failed:", error);
		throw error;
	}
};

// Axios response interceptor
adminApi.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error?.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const newAccessToken = await refreshToken();

				if (newAccessToken) {
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					return adminApi(originalRequest);
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
	const refreshTokenString: any = localStorage.getItem(adminRefreshToken);
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
			localStorage.setItem(adminAccessToken, newAccessToken);
			return response.data.accessToken;
		}
	} catch (error) {
		console.error("Failed to refresh token", error);
		clearCandidateFromLocal();
	}
	return null;
};

function clearCandidateFromLocal() {
	localStorage.removeItem(adminAccessToken);
	localStorage.removeItem(adminRefreshToken);
}

export default adminApiCalls;
