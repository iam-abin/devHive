import { createSlice } from "@reduxjs/toolkit";
import { INotification } from "../../types/chat";

interface INotificationSlice {
	notifications: INotification[],
    notificationsCount: number
}

const initialState: INotificationSlice = {
	notifications: [],
    notificationsCount: 0
};


const NotificationSlice = createSlice({
	name: "notification-data",
	initialState,
	reducers: {
        setCandidateNotification: (state, action) => {
			state.notifications = action.payload
        },

        clearCandidateNotification: (state) => {
			state.notifications = []
        },

        setCandidateNotificationsCount: (state, action) => {
			state.notificationsCount = action.payload
        },

        clearCandidateNotificationsCount: (state) => {
			state.notificationsCount = 0
        },
	},
});

export const { setCandidateNotification, clearCandidateNotification, setCandidateNotificationsCount, clearCandidateNotificationsCount } = NotificationSlice.actions; //we can use it in job page
export default NotificationSlice.reducer;
