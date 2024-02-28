import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CandidateProfileDetalsSlice {
	candidateProfile: any;
	changeDeleteStatus: boolean;
}
const initialState: CandidateProfileDetalsSlice = {
	candidateProfile: {},
	changeDeleteStatus: false,
};

const candidateProfileDetailsSlice = createSlice({
	name: "profile-data",
	initialState,
	reducers: {
		setCandidateProfileDetails: (state, action: PayloadAction<any>) => {
			console.log("##########################in setCandidateProfileDetails slice ", action.payload);
			
			state.candidateProfile = action.payload;
		},
		clearCandidateProfileDetails: (state) => {
			state.candidateProfile = null;
		},
		deleted: (state) => {
			state.changeDeleteStatus = !state.changeDeleteStatus;
		},
	},
});

export const { setCandidateProfileDetails, clearCandidateProfileDetails, deleted } =
	candidateProfileDetailsSlice.actions; //we can use it in Profile page
export default candidateProfileDetailsSlice.reducer;
