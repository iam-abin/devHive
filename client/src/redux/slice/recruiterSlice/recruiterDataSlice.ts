import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { recruiterAccessToken, recruiterRefreshToken } from "../../../config/localStorage";

interface Recruiter {
	data: any;
	recruiterAccessToken: string;
	recruiterRefreshToken: string;
}

const initialState = {
	loading: false,
	data: null as Recruiter | null,
	error: false,
};

const recruiterDataSlice = createSlice({
	name: "recruiter-data",
	initialState,
	reducers: {
		setRecruiter: (state, action: PayloadAction<Recruiter>) => {
			state.data = action.payload?.data;
			console.log("in setrecruiter reducer payload", action.payload);

			localStorage.setItem(
				recruiterAccessToken,
				JSON.stringify(action.payload?.recruiterAccessToken)
			);

			localStorage.setItem(
				recruiterRefreshToken,
				JSON.stringify(action.payload?.recruiterRefreshToken)
			);
		},
		clearRecruiter: (state) => {
			state.data = null;
			localStorage.removeItem(recruiterAccessToken);
			localStorage.removeItem(recruiterRefreshToken);
		},
	},
});

export const { setRecruiter, clearRecruiter } = recruiterDataSlice.actions; //we can use it in login page
export default recruiterDataSlice.reducer;
