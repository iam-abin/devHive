import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// const loadRecruiterFromLocalStorage = () => {
// 	const recruiter = localStorage.getItem("recruiter");
// 	return recruiter ? JSON.parse(recruiter) : null;
// };

interface RecruiterJobDetalsSlice {
	recruiterJob: any;
	changeDeleteStatus: boolean;
}
const initialState: RecruiterJobDetalsSlice = {
	recruiterJob: {},
	changeDeleteStatus: false,
};

const recruiterJobDetailsSlice = createSlice({
	name: "jobs-data",
	initialState,
	reducers: {
		setRecruiterJobDetails: (state, action: PayloadAction<any>) => {
			state.recruiterJob = action.payload;
		},
		clearRecruiterJobDetails: (state) => {
			state.recruiterJob = [];
		},
		deleted: (state) => {
			state.changeDeleteStatus = !state.changeDeleteStatus;
		},
	},
});

export const { setRecruiterJobDetails, clearRecruiterJobDetails, deleted } =
	recruiterJobDetailsSlice.actions; //we can use it in job page
export default recruiterJobDetailsSlice.reducer;
