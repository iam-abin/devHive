import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// const loadRecruiterFromLocalStorage = () => {
// 	const recruiter = localStorage.getItem("recruiter");
// 	return recruiter ? JSON.parse(recruiter) : null;
// };

interface CandidateJobDetalsSlice {
	candidateJob: any;
	changeDeleteStatus: boolean;
}
const initialState: CandidateJobDetalsSlice = {
	candidateJob: {},
	changeDeleteStatus: false,
};

const candidateJobDetailsSlice = createSlice({
	name: "jobs-data",
	initialState,
	reducers: {
		setCandidateJobDetails: (state, action: PayloadAction<any>) => {
			state.candidateJob = action.payload;
		},
		clearCandidateJobDetails: (state) => {
			state.candidateJob = [];
		},
		deleted: (state) => {
			state.changeDeleteStatus = !state.changeDeleteStatus;
		},
	},
});

export const { setCandidateJobDetails, clearCandidateJobDetails, deleted } =
	candidateJobDetailsSlice.actions; //we can use it in job page
export default candidateJobDetailsSlice.reducer;
