import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Candidate {
	id: string;
	name: string;
	email: string;
	phone: string;
}

const loadCandidateFromLocalStorage = () => {
	const candidate = localStorage.getItem("candidate");
	return candidate ? JSON.parse(candidate) : null;
};

const initialState = {
	candidate: loadCandidateFromLocalStorage(),
};

const candidateDataSlice = createSlice({
	name: "candidate-data",
	initialState,
	reducers: {
		setCandidate: (state, action: PayloadAction<Candidate>) => {
			state.candidate = action.payload;
			localStorage.setItem("candidate", JSON.stringify(action.payload));
		},
        clearCandidate: (state)=>{
            state.candidate = null;
            localStorage.removeItem("candidate")
        }
	},
});


export const { setCandidate, clearCandidate } = candidateDataSlice.actions; //we can use it in login page
export default candidateDataSlice.reducer;