import axios, { AxiosError, AxiosInstance } from "axios";
import { candidateAccessToken } from "../../config/localStorage";
import { BASE_URL } from "../../config/baseUrl";

export const candidateApi: AxiosInstance = axios.create({
    baseURL: BASE_URL,
});

// Request interceptor
candidateApi.interceptors.request.use(
    async (config: any) => {
        let tokenString = localStorage.getItem(candidateAccessToken);

        if (tokenString) {
            const token = JSON.parse(tokenString);

            if (
                config.headers["Content-Type"] &&
                config.headers["Content-Type"].startsWith("multipart/form-data")
            ) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                };
            } else {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);
