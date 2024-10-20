import axios from "axios";
import { BASE_URL } from "../config/baseUrl";
import { IResponse } from "../types/api";
import {
    clearItemFromLocalStorage,
    getItemFromLocalStorage,
    setItemToLocalStorage,
} from "../utils/localStorage";
import { notify } from "../utils/toastMessage";

export const refreshToken = async (
    accessTokenKey: string,
    refreshTokenKey: string
) => {
    const refreshToken: string | null =
        getItemFromLocalStorage(refreshTokenKey);
    try {
        if (!refreshToken) throw new Error("Refresh Token not found");
        
        const response: IResponse = await axios.post(
            `${BASE_URL}/auth/jwt-refresh/refreshToken`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            }
        );

        if (response.data.accessToken) {
            const newAccessToken = response.data.accessToken;
            setItemToLocalStorage(accessTokenKey, newAccessToken);
            return response.data.accessToken;
        }
    } catch (error) {
        console.error("Failed to refresh token", error);
        notify("Failed to refresh token", "error");

        clearItemFromLocalStorage(accessTokenKey);
        clearItemFromLocalStorage(refreshTokenKey);
    }
};
