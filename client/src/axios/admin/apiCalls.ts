import axios from "axios";
import {
	adminAccessToken,
	adminRefreshToken,
} from "../../config/localStorage";
import { adminApi } from "./api";
import { BASE_URL } from "../../config/baseUrl";

const adminApiCalls = async (method: string, url: string, data?: any) => {
	return new Promise(async (resolve, reject) => {
		try {
			let response: any, error: any;

			if (method === "post") {
				response = await adminApi.post(url, data).catch((err) => {
					error = err;
				});
			} else if (method === "get") {
				response = await adminApi.get(url, data).catch((err) => {
					error = err;
				});
			} else if (method === "patch") {
				response = await adminApi.patch(url, data).catch((err) => {
					error = err;
				});
			} else if (method === "put") {
				response = await adminApi.put(url, data).catch((err) => {
					error = err;
				});
			} else if (method === "delete") {
				response = await adminApi.delete(url, data).catch((err) => {
					error = err;
				});
			}

			if (response) {
				console.log("in apiCalls response.data ", response.data);

				resolve(response);
			} else if (error) {
				console.log("in apiCalls error ", error);
				if (error.response?.status === 401) {
					refreshAccessToken(error)
						.then((response: any) => {
							resolve(response.data);
						})
						.catch((error: any) => {
							if (error?.response?.status === 401) {
								clearAdminFromLocal();
							} else {
								reject(error);
							}
						});
				} else {
					reject(error?.response?.data);
				}
			}
		} catch (err) {
			reject(err);
		}
	});
};

const refreshAccessToken = async (error: any) => {
	const originalRequest = error.config;
	try {
		// if the error is due to an expired access token
		if (error.response?.status === 401) {
			const refreshTokenString = localStorage.getItem(adminRefreshToken);
			console.log("in refreshAccessToken refreshTokenString", refreshTokenString);
		
			
			if (refreshTokenString) {
				const refreshToken = JSON.parse(refreshTokenString)
				originalRequest._retry = true;

				return new Promise(async (resolve, reject) => {
					try {
						//refreshing the access token
						const response = await axios
							.post(
								`${BASE_URL}/auth/jwt-refresh/refreshToken`,
								null,
								{
									headers: {
										Authorization: `Bearer ${refreshToken}`,
									},
								}
							)
							.catch((err) => {
								reject(err);
							});
						if (response) {
							const newAccessToken = response.data.accessToken;
							localStorage.setItem(
								adminAccessToken,
								newAccessToken
							);

							originalRequest.headers["Authorization"] =
								newAccessToken;

							// Retry the original request with the new access token
                            console.log("originalRequest or error.config", originalRequest);
                            
							axios(originalRequest)
								.then((response) => {
									resolve(response);
								})
								.catch((error) => {
									reject(error);
								});
						}
					} catch (refreshError) {
						// If refresh token fails, redirect to login or handle as needed
						console.error("Refresh token failed:", refreshError);
						clearAdminFromLocal();
					}
				});
			} else {
				// No refresh token available
				clearAdminFromLocal();
			}
		}
	} catch (error) {
		clearAdminFromLocal();
	}
};

export const clearAdminFromLocal = () => {
	localStorage.removeItem(adminAccessToken);
	localStorage.removeItem(adminRefreshToken);
	window.location.reload();
};

export default adminApiCalls;
