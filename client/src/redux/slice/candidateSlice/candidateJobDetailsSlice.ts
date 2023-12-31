import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
