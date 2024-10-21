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
        setNotification: (state, action) => {
			state.notifications = action.payload
        },

        clearNotification: (state) => {
			state.notifications = []
        },

        setNotificationsCount: (state, action) => {
			state.notificationsCount = action.payload
        },

        clearNotificationsCount: (state) => {
			state.notificationsCount = 0
        },
	},
});

export const { setNotification, clearNotification, setNotificationsCount, clearNotificationsCount } = NotificationSlice.actions; //we can use it in job page
export default NotificationSlice.reducer;
