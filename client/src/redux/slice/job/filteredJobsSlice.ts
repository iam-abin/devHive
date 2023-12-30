import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Jobs {
	data: any
}

const initialState = {
	loading: false,
	data: null as Jobs | null,
	error: false,
};

const filteredJobsSlice = createSlice({
	name: "jobs-data",
	initialState,
	reducers: {
		setFilteredJobs: (state, action: PayloadAction<Jobs>) => {
			state.data = action.payload?.data;
			console.log("in setFilteredJobs reducer payload", action.payload);
		},
		clearFilteredJobs: (state) => {
			state.data = null;
		},
	},
});

export const { setFilteredJobs, clearFilteredJobs } = filteredJobsSlice.actions; //we can use it in login page
export default filteredJobsSlice.reducer;
