import axios from "axios";
import {
	candidateAccessToken,
	candidateRefreshToken,
} from "../../config/localStorage";
import { candidateApi } from "./api";
import { BASE_URL } from "../../config/baseUrl";

const candidateApiCalls = async (method: string, url: string, data?: any) => {
	return new Promise(async (resolve, reject) => {
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
			const originalRequest = error.config;

				if (originalRequest.url !== "/auth/candidate/signin" && error.response) {
				console.log("ooooooooooooooooooriginalRequest",originalRequest);
				console.log("ooooooooooooooooooriginalRequest.url",originalRequest.url);
				
			// if (error.response) {
				// Access Token was expired
				if (error.response.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true;

					try {
						const refreshTokenString: any = localStorage.getItem(
							candidateRefreshToken
						);
						const refreshToken = JSON.parse(refreshTokenString);
						//refreshing the access token
						const response = await axios.post(
							`${BASE_URL}/auth/jwt-refresh/refreshToken`,
							null,
							{
								headers: {
									Authorization: `Bearer ${refreshToken}`,
								},
							}
						);

						const newAccessToken = response.data.accessToken;
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

						// return instance(originalRequest);
					} catch (_error) {
						return Promise.reject(_error);
					}
				}
			}
		}
	});
};

export default candidateApiCalls;
