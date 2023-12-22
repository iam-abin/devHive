import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { BASE_URL } from '../../config/baseUrl';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config: any) => {
    // Check if the access token is available in local storage
    const accessToken = localStorage.getItem('recruiterAccessToken');

    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    //  these lines are part of a mechanism to automatically retry a failed request 
    // if the error is due to an expired access token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Attempt to refresh the access token using the refresh token
      const refreshToken = localStorage.getItem('recruiterRefreshToken');

      if (refreshToken) {
        try {
         
          const response = await axiosInstance.post('/auth/jwt-refresh/refreshToken', {
            refreshToken,
          });

          // Update the access token in local storage
          localStorage.setItem('recruiterAccessToken', response.data.recruiterAccessToken);

          // Retry the original request with the new access token
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // If refresh token fails, redirect to login or handle as needed
          console.error('Refresh token failed:', refreshError);
          // Redirect to login or handle the situation accordingly
          // Example: window.location.href = '/login';
        //   store.dispatch(clearEmployerToken());
        // window.location.replace("/");
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;