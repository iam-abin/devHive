import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface CandidateJobIdSlice {
    jobId: string ;
    // jobDetails: any | null;
    status: string ;
}
const initialState: CandidateJobIdSlice = {
	jobId: "",
	// jobDetails: null,
	status: "",
};


const CandidateJobIdSlice = createSlice({
	name: "job-data",
	initialState,
	reducers: {
        setCandidateJobId: (state, action: PayloadAction<string>) => {
            state.jobId = action.payload;
        },
        clearCandidateJobId: (state) => {
            state.jobId = '';
        },
		// clearCandidateJobDetails: (state) => {
		// 	state.jobDetails = null;
		// },
	},
});

export const { setCandidateJobId, clearCandidateJobId } = CandidateJobIdSlice.actions; //we can use it in job page
export default CandidateJobIdSlice.reducer;
