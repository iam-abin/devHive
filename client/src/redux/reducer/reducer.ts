import { combineReducers } from "@reduxjs/toolkit";

import adminAuthSlice from "../slice/adminSlice/adminAuthSlice";

import candidateAuthSlice from "../slice/candidateSlice/candidateAuthSlice";
import candidateDataSlice from "../slice/candidateSlice/candidateDataSlice";

import recruiterAuthSlice from "../slice/recruiterSlice/recruiterAuthSlice";
import recruiterDataSlice from "../slice/recruiterSlice/recruiterDataSlice";

const rootRedcucer = combineReducers({
    adminAuth: adminAuthSlice,

    candidateAuth: candidateAuthSlice,
    candidateData: candidateDataSlice,

    recruiterAuth: recruiterAuthSlice,
    recruiterData: recruiterDataSlice,
}) 

export type RootState = ReturnType<typeof rootRedcucer> 
export default rootRedcucer