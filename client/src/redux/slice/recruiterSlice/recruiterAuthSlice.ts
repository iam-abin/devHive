import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	recruiterLoggedIn: false,
};

const recruiterAuthSlice = createSlice({
	name: "recruiter-auth",
	initialState,
	reducers: {
		recruiterSignin: (state) => {
			state.recruiterLoggedIn = true;
		},
		recruiterSignout: (state) => {
			state.recruiterLoggedIn = false;
		},
	},
});

export const { recruiterSignin, recruiterSignout } = recruiterAuthSlice.actions;
export default recruiterAuthSlice.reducer;
