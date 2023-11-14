import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	adminLoggedIn: false,
};

const adminAuthSlice = createSlice({
	name: "admin-auth",
	initialState,
	reducers: {
		adminSignin: (state) => {
			state.adminLoggedIn = true;
		},
		adminSignout: (state) => {
			state.adminLoggedIn = false;
		},
	},
});

export const { adminSignin, adminSignout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
