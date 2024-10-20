import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
    clearItemFromLocalStorage,
    setItemToLocalStorage,
} from "../../../utils/localStorage";
import { LOCAL_STORAGE } from "../../../utils/constants";

interface Candidate {
    data: any;
	accessToken: string;
    refreshToken: string;
}

const initialState = {
    loading: false,
    data: null as Candidate | null,
    error: false,
};

const candidateDataSlice = createSlice({
    name: "candidate-data",
    initialState,
    reducers: {
        setCandidate: (state, action: PayloadAction<Candidate>) => {
            state.data = action.payload?.data;

            setItemToLocalStorage(
                LOCAL_STORAGE.CANDIDATE_ACCESS_TOKEN,
                JSON.stringify(action.payload?.accessToken)
            );
            setItemToLocalStorage(
                LOCAL_STORAGE.CANDIDATE_REFRESH_TOKEN,
                JSON.stringify(action.payload?.refreshToken)
            );
        },
        clearCandidate: (state) => {
            state.data = null;
            clearItemFromLocalStorage(LOCAL_STORAGE.CANDIDATE_ACCESS_TOKEN);
            clearItemFromLocalStorage(LOCAL_STORAGE.CANDIDATE_REFRESH_TOKEN);
        },
    },
});

export const { setCandidate, clearCandidate } = candidateDataSlice.actions; //we can use it in login page
export default candidateDataSlice.reducer;
