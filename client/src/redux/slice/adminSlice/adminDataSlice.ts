import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
	adminAccessToken,
	adminRefreshToken,
} from "../../../config/localStorage";

interface Admin {
	data: any;
	adminAccessToken: string;
	adminRefreshToken: string;
}

// const loadAdminFromLocalStorage = () => {
// 	const admin = localStorage.getItem("admin");
// 	return admin ? JSON.parse(admin) : null;
// };

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

			localStorage.setItem(
				adminAccessToken,
				JSON.stringify(action.payload?.adminAccessToken)
			);
			localStorage.setItem(
				adminRefreshToken,
				JSON.stringify(action.payload?.adminRefreshToken)
			);
		},
		clearAdmin: (state) => {
			state.data = null;
			localStorage.removeItem(adminAccessToken);
			localStorage.removeItem(adminRefreshToken);
		},
	},
});

export const { setAdmin, clearAdmin } = adminDataSlice.actions; //we can use it in login page
export default adminDataSlice.reducer;
