import { combineReducers } from "@reduxjs/toolkit";

import adminDataSlice from "../slice/adminSlice/adminDataSlice";

import candidateDataSlice from "../slice/candidateSlice/candidateDataSlice";

import recruiterDataSlice from "../slice/recruiterSlice/recruiterDataSlice";

import filteredJobsSlice from "../slice/job/filteredJobsSlice";

import recruiterJobIdSlice from "../slice/recruiterSlice/recruiterJobIdSlice";
import recruiterJobDetailsSlice from "../slice/recruiterSlice/recruiterJobIdSlice";

import candidateJobIdSlice from "../slice/candidateSlice/candidateJobIdSlice";
import candidateJobDetailsSlice from "../slice/candidateSlice/candidateJobDetailsSlice";

import apiCallLoadingSlice from "../slice/loaderSlice/isLoading"

const rootRedcucer = combineReducers({
    adminData: adminDataSlice,

    candidateData: candidateDataSlice,

    recruiterData: recruiterDataSlice,

    filteredJobs: filteredJobsSlice,

    recruiterJobId: recruiterJobIdSlice,
    recruiterJobDetails: recruiterJobDetailsSlice,

    candidateJobId: candidateJobIdSlice,
    candidateJobDetails: candidateJobDetailsSlice,

    loading: apiCallLoadingSlice,



}) 

export type RootState = ReturnType<typeof rootRedcucer> 
export default rootRedcucer