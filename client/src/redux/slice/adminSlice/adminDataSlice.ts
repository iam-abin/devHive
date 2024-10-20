import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE } from "../../../utils/constants";
import {
    clearItemFromLocalStorage,
    setItemToLocalStorage,
} from "../../../utils/localStorage";

interface Admin {
    data: any;
    accessToken: string;
    refreshToken: string;
}

const initialState = {
    loading: false,
    data: null as Admin | null,
    error: false,
};

const adminDataSlice = createSlice({
    name: "admin-data",
    initialState,
    reducers: {
        setAdmin: (state, action: PayloadAction<Admin>) => {
            state.data = action.payload?.data;

            setItemToLocalStorage(
                LOCAL_STORAGE.ADMIN_ACCESS_TOKEN,
                JSON.stringify(action.payload?.accessToken)
            );

            setItemToLocalStorage(
                LOCAL_STORAGE.ADMIN_REFRESH_TOKEN,
                JSON.stringify(action.payload?.refreshToken)
            );
        },
        clearAdmin: (state) => {
            state.data = null;
            clearItemFromLocalStorage(LOCAL_STORAGE.ADMIN_ACCESS_TOKEN);
            clearItemFromLocalStorage(LOCAL_STORAGE.ADMIN_REFRESH_TOKEN);
        },
    },
});

export const { setAdmin, clearAdmin } = adminDataSlice.actions; //we can use it in login page
export default adminDataSlice.reducer;
