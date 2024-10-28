import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
        setNotifications: (state, action: PayloadAction<INotification[]>) => {
			state.notifications = action.payload
        },

        clearNotifications: (state) => {
			state.notifications = []
        },

        // Increment the count by 1
        setNotificationsCount: (state, action: PayloadAction<number>) => {
			state.notificationsCount = action.payload
        },

        clearNotificationsCount: (state) => {
			state.notificationsCount = 0
        },
	},
});

export const { setNotifications, clearNotifications, setNotificationsCount, clearNotificationsCount } = NotificationSlice.actions; //we can use it in job page
export default NotificationSlice.reducer;
