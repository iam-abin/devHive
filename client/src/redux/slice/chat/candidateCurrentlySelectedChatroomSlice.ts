import { createSlice } from "@reduxjs/toolkit";

interface CandidateCurrentlySelectedChatRoomSliceInterface {
	// chatRoomId: string | null
    // users: string[] ;
	data: any
}

const initialState: CandidateCurrentlySelectedChatRoomSliceInterface = {
	// chatRoomId: null,
	// users: []
	data: {}
};


const CandidateCurrentlySelectedChatRoomSlice = createSlice({
	name: "job-data",
	initialState,
	reducers: {
        setCandidateCurrentlySelectedChatRoom: (state, action) => {
			// state.chatRoomId= action.payload.id,
			// state.users= action.payload.users
			state.data = action.payload
        },

        clearCandidateCurrentlySelectedChatRoom: (state) => {
            // state.chatRoomId= null,
			// state.users= []
			state.data = null
        },
	},
});

export const { setCandidateCurrentlySelectedChatRoom, clearCandidateCurrentlySelectedChatRoom } = CandidateCurrentlySelectedChatRoomSlice.actions; //we can use it in job page
export default CandidateCurrentlySelectedChatRoomSlice.reducer;
