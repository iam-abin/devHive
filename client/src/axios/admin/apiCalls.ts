import { adminApi } from "./api";
import { notify } from "../../utils/toastMessage";
import { LOCAL_STORAGE } from "../../utils/constants";
import { IResponse } from "../../types/api";
import { refreshToken } from "../refresh";

const adminApiCalls = async (method: string, url: string, data?: any): Promise<IResponse> => {
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
				
		return response.data
	} catch (error: any) {
		notify(error.response.data.errors[0].message, "error");
		throw error
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
				const newAccessToken = await refreshToken(LOCAL_STORAGE.ADMIN_ACCESS_TOKEN, LOCAL_STORAGE.ADMIN_REFRESH_TOKEN);

				if (newAccessToken) {
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					return adminApi(originalRequest);
				}
			} catch (error: any) {
				notify(error.response.data.errors[0].message, "error");
				// clearCandidateFromLocal();
			}
		}
		return Promise.reject(error);
	}
);

export default adminApiCalls;
