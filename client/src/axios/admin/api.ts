import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { BASE_URL } from "../../config/baseUrl";
import { LOCAL_STORAGE } from "../../utils/constants";
import { getItemFromLocalStorage } from "../../utils/localStorage";

export const adminApi: AxiosInstance = axios.create({
    baseURL: BASE_URL,
});

// Request interceptor
adminApi.interceptors.request.use(
    async (config: InternalAxiosRequestConfig<any>) => {
        
        let token: string | null = getItemFromLocalStorage(LOCAL_STORAGE.ADMIN_ACCESS_TOKEN)

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);
