import { createSlice } from "@reduxjs/toolkit";

interface RecruiterCurrentlySelectedChatRoomSliceInterface {
	// chatRoomId: string | null
    // users: string[] ;
	data: any
}

const initialState: RecruiterCurrentlySelectedChatRoomSliceInterface = {
	// chatRoomId: null,
	// users: []
	data: {}
};


const RecruiterCurrentlySelectedChatRoomSlice = createSlice({
	name: "job-data",
	initialState,
	reducers: {
        setRecruiterCurrentlySelectedChatRoom: (state, action) => {
			// state.chatRoomId= null,
			// state.users= action.payload.users
			state.data = action.payload
        },

        clearRecruiterCurrentlySelectedChatRoom: (state) => {
            // state.chatRoomId= null,
			// state.users= []
			state.data = null
        },
	},
});

export const { setRecruiterCurrentlySelectedChatRoom, clearRecruiterCurrentlySelectedChatRoom } = RecruiterCurrentlySelectedChatRoomSlice.actions; //we can use it in job page
export default RecruiterCurrentlySelectedChatRoomSlice.reducer;
