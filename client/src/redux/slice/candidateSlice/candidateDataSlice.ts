import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
	candidateAccessToken,
	candidateRefreshToken,
} from "../../../config/localStorage";

interface Candidate {
	// data: { id: string; name: string; email: string; phone: string };
	data: any
	candidateAccessToken: string;
	candidateRefreshToken: string;
}

// const loadCandidateFromLocalStorage = () => {
// 	const candidate = localStorage.getItem("candidate");
// 	return candidate ? JSON.parse(candidate) : null;
// };

const initialState = {
	loading: false,
	data: null as Candidate | null,
	error: false,
};

// const initialState = {
// 	data: loadCandidateFromLocalStorage(),
// };

const candidateDataSlice = createSlice({
	name: "candidate-data",
	initialState,
	reducers: {
		setCandidate: (state, action: PayloadAction<Candidate>) => {
			state.data = action.payload?.data;
			console.log("in setcandidate reducer payload", action.payload);

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
