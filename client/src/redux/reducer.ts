import { combineReducers } from "@reduxjs/toolkit";


import apiCallLoadingSlice from "./slice/isLoading";

import userSlice from "./slice/user"
import jobSlice from "./slice/job"
import chatSlice from "./slice/chat"
import notificationSlice from "./slice/notification"

// ============================================================================================


const rootRedcucer = combineReducers({
    loading: apiCallLoadingSlice,

    // ============================================================================================
    userReducer: userSlice,
    jobReducer: jobSlice,
    chatReducer: chatSlice,
    notificationReducer: notificationSlice,
});

export type RootState = ReturnType<typeof rootRedcucer>;
export default rootRedcucer;
