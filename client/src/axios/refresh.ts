import axios from "axios";
import { BASE_URL } from "../config/baseUrl";
import { IResponse } from "../types/api";
import {
    clearLocalStorage,
    getItemFromLocalStorage,
    setItemToLocalStorage,
} from "../utils/localStorage";
import { notify } from "../utils/toastMessage";

export const refreshToken = async (
    accessTokenKey: string,
    refreshTokenKey: string,
) => {
    const refreshToken: string | null =
        getItemFromLocalStorage(refreshTokenKey);
    try {
        if (!refreshToken) throw new Error("Refresh Token not found");
        
        const {data}: IResponse = await axios.post(
            `${BASE_URL}/auth/jwt-refresh/refreshToken`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            }
        );
        
        if (data.data.accessToken) {
            const newAccessToken = data.data.accessToken;
            setItemToLocalStorage(accessTokenKey, JSON.stringify(newAccessToken));
            return data.data.accessToken;
        }
    } catch (error) {
        notify("Refresh token expired! Signup again", "error");
        clearLocalStorage();
        window.location.href = "/";
    }
};
