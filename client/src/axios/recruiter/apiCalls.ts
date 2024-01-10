import axios from "axios";
import {
	recruiterAccessToken,
	recruiterRefreshToken,
} from "../../config/localStorage";
import { recruiterApi } from "./api";
import { BASE_URL } from "../../config/baseUrl";

const recruiterApiCalls = async (method: string, url: string, data?: any) => {
	return new Promise(async (resolve, reject) => {
		try {
			let response: any, error: any;

			if (method === "post") {
				response = await recruiterApi.post(url, data).catch((err) => {
					error = err;
				});
			} else if (method === "get") {
				response = await recruiterApi.get(url, data).catch((err) => {
					error = err;
				});
			} else if (method === "patch") {
				response = await recruiterApi.patch(url, data).catch((err) => {
					error = err;
				});
			} else if (method === "put") {
				response = await recruiterApi.put(url, data).catch((err) => {
					error = err;
				});
			} else if (method === "delete") {
				response = await recruiterApi.delete(url, data).catch((err) => {
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
								clearRecruiterFromLocal();
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
			
			
			const refreshTokenString = localStorage.getItem(recruiterRefreshToken);
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
								recruiterAccessToken,
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
						clearRecruiterFromLocal();
					}
				});
			} else {
				// No refresh token available
				clearRecruiterFromLocal();
			}
		}
	} catch (error) {
		clearRecruiterFromLocal();
	}
};

export const clearRecruiterFromLocal = () => {
	localStorage.removeItem(recruiterAccessToken);
	localStorage.removeItem(recruiterRefreshToken);
	window.location.reload();
};

export default recruiterApiCalls;
