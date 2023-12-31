import axios from "axios";
import {
	candidateAccessToken,
	candidateRefreshToken,
} from "../../config/localStorage";
import { candidateApi } from "./api";
import { BASE_URL } from "../../config/baseUrl";

const candidateApiCalls = async (method: string, url: string, data?: any) => {
	return new Promise(async (resolve, reject) => {
		try {
			let response: any, error: any;
			console.log("inside candidate api calls ", method);
			

			if (method === "post") {
				response = await candidateApi.post(url, data).catch((err) => {
					error = err;
				});
			} else if (method === "get") {
				response = await candidateApi.get(url, data).catch((err) => {
					error = err;
				});
			} else if (method === "patch") {
				response = await candidateApi.patch(url, data).catch((err) => {
					error = err;
				});
			} else if (method === "put") {
				response = await candidateApi.put(url, data).catch((err) => {
					error = err;
				});
			} else if (method === "delete") {
				response = await candidateApi.delete(url, data).catch((err) => {
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
							console.log("in apiCalls then.catch", error);
							
							if (error?.response?.status === 401) {
								clearCandidateFromLocal();
							} else {
								reject(error);
							}
						});
				} else {
					reject(error?.response?.data);
				}
			}
		} catch (err) {
			console.log("in apiCalls final error", err);
			
			reject(err);
		}
	});
};

const refreshAccessToken = async (error: any) => {
	const originalRequest = error.config;
	console.log("inside refresh access token ", error);
	
	try {
		// if the error is due to an expired access token
		if (error.response?.status === 401) {
			const refreshTokenString = localStorage.getItem(candidateRefreshToken);
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
							const newAccessToken = response.data.newAccessoken;
							localStorage.setItem(
								candidateAccessToken,
								newAccessToken
							);

							originalRequest.headers["Authorization"] =
								newAccessToken;

							// Retry the original request with the new access token
							console.log(
								"originalRequest or error.config",
								originalRequest
							);

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
						clearCandidateFromLocal();
					}
				});
			} else {
				// No refresh token available
				clearCandidateFromLocal();
			}
		}
	} catch (error) {
		clearCandidateFromLocal();
	}
};

export const clearCandidateFromLocal = () => {
	localStorage.removeItem(candidateAccessToken);
	localStorage.removeItem(candidateRefreshToken);
	window.location.reload();
};

export default candidateApiCalls;
