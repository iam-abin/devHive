import axios, { AxiosError, AxiosInstance } from "axios";
import { BASE_URL } from "../config/baseUrl";
import { LOCAL_STORAGE } from "../utils/constants";
import { getItemFromLocalStorage } from "../utils/localStorage";

// Utility function to create an Axios instance with interceptors
const createApiInstance = (baseURL: string): AxiosInstance => {
    const apiInstance = axios.create({ baseURL });

    // Request interceptor
    apiInstance.interceptors.request.use(
        async (config: any) => {
            const token: string | null = getItemFromLocalStorage(LOCAL_STORAGE.ACCESS_TOKEN);

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

    return apiInstance;
};

// Exporting API instance
export const axiosInstance: AxiosInstance = createApiInstance(BASE_URL);