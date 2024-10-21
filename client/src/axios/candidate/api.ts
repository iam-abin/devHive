import axios, { AxiosError, AxiosInstance } from "axios";
import { BASE_URL } from "../../config/baseUrl";
import { getItemFromLocalStorage } from "../../utils/localStorage";
import { LOCAL_STORAGE } from "../../utils/constants";

export const candidateApi: AxiosInstance = axios.create({
    baseURL: BASE_URL,
});

// Request interceptor
candidateApi.interceptors.request.use(
    async (config: any) => {
        
        let token: string | null = getItemFromLocalStorage(LOCAL_STORAGE.ACCESS_TOKEN);

        if (token) {
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
