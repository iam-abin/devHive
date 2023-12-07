import { combineReducers } from "@reduxjs/toolkit";

import adminAuthSlice from "../slice/adminSlice/adminAuthSlice";

import candidateAuthSlice from "../slice/candidateSlice/candidateAuthSlice";
import candidateDataSlice from "../slice/candidateSlice/candidateDataSlice";

import recruiterAuthSlice from "../slice/recruiterSlice/recruiterAuthSlice";
import recruiterDataSlice from "../slice/recruiterSlice/recruiterDataSlice";

import recruiterJobIdSlice from "../slice/recruiterSlice/recruiterJobIdSlice";
import recruiterJobDetailsSlice from "../slice/recruiterSlice/recruiterJobIdSlice";
import candidateJobIdSlice from "../slice/candidateSlice/candidateJobIdSlice";
import candidateJobDetailsSlice from "../slice/candidateSlice/candidateJobDetailsSlice";

const rootRedcucer = combineReducers({
    adminAuth: adminAuthSlice,

    candidateAuth: candidateAuthSlice,
    candidateData: candidateDataSlice,

    recruiterAuth: recruiterAuthSlice,
    recruiterData: recruiterDataSlice,

    recruiterJobId: recruiterJobIdSlice,
    recruiterJobDetails: recruiterJobDetailsSlice,

    candidateJobId: candidateJobIdSlice,
    candidateJobDetails: candidateJobDetailsSlice,



}) 

export type RootState = ReturnType<typeof rootRedcucer> 
export default rootRedcucer