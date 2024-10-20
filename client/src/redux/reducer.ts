import { combineReducers } from "@reduxjs/toolkit";

import adminDataSlice from "./slice/adminSlice/adminDataSlice";

import candidateProfileSlice from "./slice/candidateSlice/candidateProfileSlice";

import candidateDataSlice from "./slice/candidateSlice/candidateDataSlice";

import recruiterDataSlice from "./slice/recruiterSlice/recruiterDataSlice";

import filteredJobsSlice from "./slice/job/filteredJobsSlice";

import recruiterJobDetailsSlice from "./slice/chat/recruiterCurrentlySelectedChatroomSlice";


import candidateCurrentlySelectedChatroomSlice from "./slice/chat/candidateCurrentlySelectedChatroomSlice";
import recruiterCurrentlySelectedChatroomSlice from "./slice/chat/recruiterCurrentlySelectedChatroomSlice";

import candidateNotificationSlice from "./slice/chat/notificationSlice";

import apiCallLoadingSlice from "./slice/loaderSlice/isLoading";

import userSlice from "./slice/user"
import jobSlice from "./slice/job"
import chatSlice from "./slice/chat"
import notificationSlice from "./slice/notification"

// ============================================================================================


const rootRedcucer = combineReducers({
    adminData: adminDataSlice,

    candidateData: candidateDataSlice,

    candidateProfile: candidateProfileSlice,

    recruiterData: recruiterDataSlice,

    filteredJobs: filteredJobsSlice,

    recruiterJobDetails: recruiterJobDetailsSlice,


    candidateCurrentlySelectedChatroom: candidateCurrentlySelectedChatroomSlice,
    recruiterCurrentlySelectedChatroom: recruiterCurrentlySelectedChatroomSlice,

    candidateNotification: candidateNotificationSlice,

    loading: apiCallLoadingSlice,

    // ============================================================================================
    userReducer: userSlice,
    jobReducer: jobSlice,
    chatReducer: chatSlice,
    notificationReducer: notificationSlice,
});

export type RootState = ReturnType<typeof rootRedcucer>;
export default rootRedcucer;
