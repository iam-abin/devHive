import { combineReducers } from "@reduxjs/toolkit";

import apiCallLoadingSlice from "./slice/isLoading";
import chatSlice from "./slice/chat"
import jobSlice from "./slice/job"
import notificationSlice from "./slice/notification"
import userSlice from "./slice/user"


const rootRedcucer = combineReducers({
    loading: apiCallLoadingSlice,
    chatReducer: chatSlice,
    jobReducer: jobSlice,
    notificationReducer: notificationSlice,
    userReducer: userSlice,
});

export type RootState = ReturnType<typeof rootRedcucer>;
export default rootRedcucer;
