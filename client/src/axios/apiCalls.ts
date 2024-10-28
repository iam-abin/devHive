import { axiosInstance } from "./axiosInstance";
import { notify } from "../utils/toastMessage";
import { LOCAL_STORAGE } from "../utils/constants";
import { refreshToken } from "./refresh";
import { IResponse } from "../types/api";

const makeApiCall = async (
    method: string,
    url: string,
    data?: any,
    isFileUpload?: boolean
): Promise<IResponse> => {
    // const dispatch = useDispatch()
    try {
        // dispatch(setLoading())
        let response;
        switch (method.toLowerCase()) {
            case "get":
                response = await axiosInstance.get(url, data);
                break;

            case "post":
                response = await axiosInstance.post(url, data);
                break;

            case "put":
                response = isFileUpload
                    ? await axiosInstance.put(url, data, {
                          headers: { "Content-Type": "multipart/form-data" },
                      })
                    : await axiosInstance.put(url, data);
                break;
 
            case "patch":
                response = await axiosInstance.patch(url, data);
                break;

            case "delete":
                response = await axiosInstance.delete(url, data);
                break;

            default:
                throw new Error(`Invalid method: ${method}`);
        }
        return response.data;
    } catch (error: any) {
        notify(error.response.data.errors[0].message, "error");
        throw error;
    }finally{
        // dispatch(setLoaded())
    }
};

// Axios response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {

        const originalRequest = error.config;
        
        if (error?.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // To fail retry after first refresh request

            try {
                const newAccessToken = await refreshToken(
                    LOCAL_STORAGE.ACCESS_TOKEN,
                    LOCAL_STORAGE.REFRESH_TOKEN
                );

                if (newAccessToken) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (error: any) {
                notify(error.response.data.errors[0].message, "error");
            }
        }
        return Promise.reject(error);
    }
);

export default makeApiCall;
