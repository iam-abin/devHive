import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	candidateLoggedIn: false,
};

const candidateAuthSlice = createSlice({
	name: "candidate-auth",
	initialState,
	reducers: {
		candidateSignin: (state) => {
			state.candidateLoggedIn = true;
		},
		candidateSignout: (state) => {
			state.candidateLoggedIn = false;
		},
	},
});

export const { candidateSignin, candidateSignout } = candidateAuthSlice.actions;
export default candidateAuthSlice.reducer;
