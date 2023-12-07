import { PayloadAction, createSlice } from "@reduxjs/toolkit";


// const loadRecruiterFromLocalStorage = () => {
// 	const recruiter = localStorage.getItem("recruiter");
// 	return recruiter ? JSON.parse(recruiter) : null;
// };

interface RecruiterJobIdSlice {
    jobId: string ;
    // jobDetails: any | null;
    status: string ;
}
const initialState: RecruiterJobIdSlice = {
	jobId: "",
	// jobDetails: null,
	status: "",
};


const RecruiterJobIdSlice = createSlice({
	name: "job-data",
	initialState,
	reducers: {
        setRecruiterJobId: (state, action: PayloadAction<string>) => {
            state.jobId = action.payload;
        },
        clearRecruiterJobId: (state) => {
            state.jobId = '';
        },
		// clearRecruiterJobDetails: (state) => {
		// 	state.jobDetails = null;
		// },
	},
});

export const { setRecruiterJobId, clearRecruiterJobId } = RecruiterJobIdSlice.actions; //we can use it in job page
export default RecruiterJobIdSlice.reducer;
