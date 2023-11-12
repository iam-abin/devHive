import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	adminLoggedIn: false,
};

const adminAuthSlice = createSlice({
	name: "admin-auth",
	initialState,
	reducers: {
		adminLoginReducer: (state) => {
			state.adminLoggedIn = true;
		},
		adminLogoutReducer: (state) => {
			state.adminLoggedIn = false;
		},
	},
});

export const { adminLoginReducer, adminLogoutReducer } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
