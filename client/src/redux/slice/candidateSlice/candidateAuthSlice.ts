import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	candidateLoggedIn: false,
};

const candidateAuthSlice = createSlice({
	name: "candidate-auth",
	initialState,
	reducers: {
		candidateLoginReducer: (state) => {
			state.candidateLoggedIn = true;
		},
		candidateLogoutReducer: (state) => {
			state.candidateLoggedIn = false;
		},
	},
});

export const { candidateLoginReducer, candidateLogoutReducer } = candidateAuthSlice.actions;
export default candidateAuthSlice.reducer;
