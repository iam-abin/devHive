import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	searchDropdownData: [],
	data: [],
	totalNumberOfPages: 0,
	currentPage: 1,
	error: false,
};

const filteredJobsSlice = createSlice({
	name: "jobs-data",
	initialState,
	reducers: {
		setFilteredJobs: (state, action: PayloadAction<any>) => {
			console.log(action.payload);
			
			state.data = action.payload;
		},

		setTotalNumberOfPages: (state, action: PayloadAction<any>) => {
			state.totalNumberOfPages = action.payload?.totalNumberOfPages;
		},

		setCurrentPage: (state, action: PayloadAction<any>) => {
			state.currentPage = action.payload?.currentPage;
		},
		
		clearFilteredJobs: (state) => {
			state.data = [];
		},

		clearTotalNumberOfPages: (state) => {
			state.totalNumberOfPages = 0;
		},

		clearCurrentPage: (state) => {
			state.currentPage = 1;
		},
	},
});

export const {  setFilteredJobs, setTotalNumberOfPages, setCurrentPage, clearFilteredJobs, clearTotalNumberOfPages, clearCurrentPage } = filteredJobsSlice.actions; //we can use it in login page
export default filteredJobsSlice.reducer;
