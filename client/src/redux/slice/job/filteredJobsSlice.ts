import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Jobs {
	searchDropdownData: any,
	data: any,
	totalNumberOfPages: any,
	currentPage: any
}

const initialState = {
	loading: false,
	searchDropdownData: [],
	data: null as Jobs[] | null,
	totalNumberOfPages: 1,
	currentPage: 1,
	error: false,
};

const filteredJobsSlice = createSlice({
	name: "jobs-data",
	initialState,
	reducers: {
		setFilteredJobs: (state, action: PayloadAction<any>) => {
			state.data = action.payload?.data;
			console.log("in setFilteredJobs reducer payload", action.payload);
		},
		setTotalNumberOfPages: (state, action: PayloadAction<any>) => {
			state.totalNumberOfPages = action.payload?.totalNumberOfPages;
			console.log("in setFilteredJobs reducer payload", action.payload);
		},
		setCurrentPage: (state, action: PayloadAction<any>) => {
			state.currentPage = action.payload?.currentPage;
			console.log("in setFilteredJobs reducer payload", action.payload);
		},
		clearFilteredJobs: (state) => {
			state.data = null;
		},

		// clearPaginationPage: (state) => {
		// 	state.totalNumberOfPages = null;
		// },
	},
});

export const {  setFilteredJobs, setTotalNumberOfPages, setCurrentPage, clearFilteredJobs } = filteredJobsSlice.actions; //we can use it in login page
export default filteredJobsSlice.reducer;
