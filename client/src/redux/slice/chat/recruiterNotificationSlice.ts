import { createSlice } from "@reduxjs/toolkit";

interface RecruiterNotificationSliceInterface {
	// chatRoomId: string | null
    // users: string[] ;
	data: any
}

const initialState: RecruiterNotificationSliceInterface = {
	// chatRoomId: null,
	// users: []
	data: {}
};


const RecruiterNotificationSlice = createSlice({
	name: "recruiter-notification-data",
	initialState,
	reducers: {
        setRecruiterNotification: (state, action) => {
			// state.chatRoomId= action.payload.id,
			// state.users= action.payload.users
			state.data = action.payload
        },

        clearRecruiterNotification: (state) => {
            // state.chatRoomId= null,
			// state.users= []
			state.data = null
        },
	},
});

export const { setRecruiterNotification, clearRecruiterNotification } = RecruiterNotificationSlice.actions; //we can use it in job page
export default RecruiterNotificationSlice.reducer;
