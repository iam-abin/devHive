import { createSlice } from "@reduxjs/toolkit";

interface CandidateNotificationSliceInterface {
	// chatRoomId: string | null
    // users: string[] ;
	data: any
}

const initialState: CandidateNotificationSliceInterface = {
	// chatRoomId: null,
	// users: []
	data: {}
};


const CandidateNotificationSlice = createSlice({
	name: "candidate-notification-data",
	initialState,
	reducers: {
        setCandidateNotification: (state, action) => {
			// state.chatRoomId= action.payload.id,
			// state.users= action.payload.users
			state.data = action.payload
        },

        clearCandidateNotification: (state) => {
            // state.chatRoomId= null,
			// state.users= []
			state.data = null
        },
	},
});

export const { setCandidateNotification, clearCandidateNotification } = CandidateNotificationSlice.actions; //we can use it in job page
export default CandidateNotificationSlice.reducer;
