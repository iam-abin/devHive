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
	totalNumberOfPages: 0,
	currentPage: 1,
	error: false,
};

const filteredJobsSlice = createSlice({
	name: "jobs-data",
	initialState,
	reducers: {
		setFilteredJobs: (state, action: PayloadAction<any>) => {
			state.data = action.payload?.data;
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
