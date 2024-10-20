import { recruiterApi } from "./api";
import { notify } from "../../utils/toastMessage";
import { LOCAL_STORAGE } from "../../utils/constants";
import { refreshToken } from "../refresh";
import { IResponse } from "../../types/api";

const recruiterApiCalls = async (
    method: string,
    url: string,
    data?: any,
    isFileUpload?: boolean
): Promise<IResponse> => {
    try {
        let response;
        switch (method.toLowerCase()) {
            case "get":
                response = await recruiterApi.get(url, data);
                break;

            case "post":
                response = await recruiterApi.post(url, data);
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
        return response.data;
    } catch (error: any) {
        notify(error.response.data.errors[0].message, "error");
        throw error;
    }
};

// Axios response interceptor
recruiterApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error?.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await refreshToken(
                    LOCAL_STORAGE.RECRUITER_ACCESS_TOKEN,
                    LOCAL_STORAGE.RECRUITER_REFRESH_TOKEN
                );

                if (newAccessToken) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return recruiterApi(originalRequest);
                }
            } catch (error: any) {
                notify(error.response.data.errors[0].message, "error");
                console.error("Refresh token failed:", error);
                // clearRecruiterFromLocal();
            }
        }
        return Promise.reject(error);
    }
);

export default recruiterApiCalls;
