import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE } from "../../../utils/constants";
import { clearItemFromLocalStorage, setItemToLocalStorage } from "../../../utils/localStorage";

interface Recruiter {
    data: any;
    accessToken: string;
    refreshToken: string;
}

const initialState = {
    loading: false,
    data: null as Recruiter | null,
    error: false,
};

const recruiterDataSlice = createSlice({
    name: "recruiter-data",
    initialState,
    reducers: {
        setRecruiter: (state, action: PayloadAction<Recruiter>) => {
            state.data = action.payload?.data;

            setItemToLocalStorage(
                LOCAL_STORAGE.RECRUITER_ACCESS_TOKEN,
                JSON.stringify(action.payload?.accessToken)
            );
            setItemToLocalStorage(
                LOCAL_STORAGE.RECRUITER_REFRESH_TOKEN,
                JSON.stringify(action.payload?.refreshToken)
            );
        },
        
        clearRecruiter: (state) => {
            state.data = null;
            clearItemFromLocalStorage(LOCAL_STORAGE.RECRUITER_ACCESS_TOKEN);
            clearItemFromLocalStorage(LOCAL_STORAGE.RECRUITER_REFRESH_TOKEN);
        },
    },
});

export const { setRecruiter, clearRecruiter } = recruiterDataSlice.actions; //we can use it in login page
export default recruiterDataSlice.reducer;
