import { candidateApi } from "./api";
import { notify } from "../../utils/toastMessage";
import { LOCAL_STORAGE } from "../../utils/constants";
import { refreshToken } from "../refresh";
import { IResponse } from "../../types/api";

const candidateApiCalls = async (
    method: string,
    url: string,
    data?: any,
    isFileUpload?: boolean
): Promise<IResponse> => {
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
        return response.data;
    } catch (error: any) {
		console.log(error);
		
        notify(error.response.data.errors[0].message, "error");
		throw error;
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
                const newAccessToken = await refreshToken(
                    LOCAL_STORAGE.ACCESS_TOKEN,
                    LOCAL_STORAGE.REFRESH_TOKEN
                );

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

export default candidateApiCalls;
