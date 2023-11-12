import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Recruiter {
	id: string;
	name: string;
	email: string;
	phone: string;
}

const loadRecruiterFromLocalStorage = () => {
	const recruiter = localStorage.getItem("recruiter");
	return recruiter ? JSON.parse(recruiter) : null;
};

const initialState = {
	recruiter: loadRecruiterFromLocalStorage(),
};

const recruiterDataSlice = createSlice({
	name: "recruiter-data",
	initialState,
	reducers: {
		setRecruiter: (state, action: PayloadAction<Recruiter>) => {
			state.recruiter = action.payload;
			localStorage.setItem("recruiter", JSON.stringify(action.payload));
		},
        clearRecruiter: (state)=>{
            state.recruiter = null;
            localStorage.removeItem("recruiter")
        }
	},
});


export const { setRecruiter, clearRecruiter } = recruiterDataSlice.actions; //we can use it in login page
export default recruiterDataSlice.reducer;