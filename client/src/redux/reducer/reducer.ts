import { combineReducers } from "@reduxjs/toolkit";

import adminDataSlice from "../slice/adminSlice/adminDataSlice";

import candidateProfileSlice from "../slice/candidateSlice/candidateProfileSlice";

import candidateDataSlice from "../slice/candidateSlice/candidateDataSlice";

import recruiterDataSlice from "../slice/recruiterSlice/recruiterDataSlice";

import filteredJobsSlice from "../slice/job/filteredJobsSlice";

import recruiterJobDetailsSlice from "../slice/chat/recruiterCurrentlySelectedChatroomSlice";

import candidateJobIdSlice from "../slice/candidateSlice/candidateJobIdSlice";
import candidateJobDetailsSlice from "../slice/candidateSlice/candidateJobDetailsSlice";

import candidateCurrentlySelectedChatroomSlice from "../slice/chat/candidateCurrentlySelectedChatroomSlice";
import recruiterCurrentlySelectedChatroomSlice from "../slice/chat/recruiterCurrentlySelectedChatroomSlice";

import apiCallLoadingSlice from "../slice/loaderSlice/isLoading"

const rootRedcucer = combineReducers({
    adminData: adminDataSlice,

    candidateData: candidateDataSlice,

    candidateProfile: candidateProfileSlice,

    recruiterData: recruiterDataSlice,

    filteredJobs: filteredJobsSlice,

    recruiterJobDetails: recruiterJobDetailsSlice,

    candidateJobId: candidateJobIdSlice,
    candidateJobDetails: candidateJobDetailsSlice,

    candidateCurrentlySelectedChatroom: candidateCurrentlySelectedChatroomSlice,
    recruiterCurrentlySelectedChatroom: recruiterCurrentlySelectedChatroomSlice,

    loading: apiCallLoadingSlice,



}) 

export type RootState = ReturnType<typeof rootRedcucer> 
export default rootRedcucer