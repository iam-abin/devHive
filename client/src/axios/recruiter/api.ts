import axios, { AxiosError, AxiosInstance } from "axios";
import { BASE_URL } from "../../config/baseUrl";
import { LOCAL_STORAGE } from "../../utils/constants";
import { getItemFromLocalStorage } from "../../utils/localStorage";

export const recruiterApi: AxiosInstance = axios.create({
    baseURL: BASE_URL,
});

// Request interceptor
recruiterApi.interceptors.request.use(
    async (config: any) => {
        
        let token = getItemFromLocalStorage(LOCAL_STORAGE.ACCESS_TOKEN);

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);
