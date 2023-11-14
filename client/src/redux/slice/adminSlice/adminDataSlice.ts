import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Admin {
	id: string;
	name: string;
	email: string;
}

const loadAdminFromLocalStorage = () => {
	const admin = localStorage.getItem("admin");
	return admin ? JSON.parse(admin) : null;
};

const initialState = {
	admin: loadAdminFromLocalStorage(),
};

const adminDataSlice = createSlice({
	name: "admin-data",
	initialState,
	reducers: {
		setAdmin: (state, action: PayloadAction<Admin>) => {
			state.admin = action.payload;
			localStorage.setItem("admin", JSON.stringify(action.payload));
		},
        clearAdmin: (state)=>{
            state.admin = null;
            localStorage.removeItem("admin")
        }
	},
});


export const { setAdmin, clearAdmin } = adminDataSlice.actions; //we can use it in login page
export default adminDataSlice.reducer;