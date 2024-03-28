import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
	candidateAccessToken,
	candidateRefreshToken,
} from "../../../config/localStorage";

interface Candidate {
	data: any
	candidateAccessToken: string;
	candidateRefreshToken: string;
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
			
			localStorage.setItem(
				candidateAccessToken,
				JSON.stringify(action.payload?.candidateAccessToken)
			);
			localStorage.setItem(
				candidateRefreshToken,
				JSON.stringify(action.payload?.candidateRefreshToken)
			);
		},
		clearCandidate: (state) => {
			state.data = null;
			localStorage.removeItem(candidateAccessToken);
			localStorage.removeItem(candidateRefreshToken);
		},
	},
});

export const { setCandidate, clearCandidate } = candidateDataSlice.actions; //we can use it in login page
export default candidateDataSlice.reducer;
