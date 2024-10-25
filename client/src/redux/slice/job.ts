import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IJob } from "../../types/Job";

interface IJobSlice {
    job: IJob | null;
    jobs: IJob[];
    currentPage: number;
    totalNumberOfPages: number;
}
const initialState: IJobSlice = {
    job: null,
    jobs: [],
    totalNumberOfPages: 0,
    currentPage: 0,
};

const JobSlice = createSlice({
    name: "jobs-data",
    initialState,
    reducers: {
        setJob: (state, action: PayloadAction<any>) => {
            state.job = action.payload;
        },
        clearJob: (state) => {
            state.job = null;
        },

        setJobs: (state, action: PayloadAction<any>) => {
            state.jobs = action.payload;
        },
        clearJobs: (state) => {
            state.jobs = [];
        },

        setTotalNumberOfPages: (state, action: PayloadAction<any>) => {
            state.totalNumberOfPages = action.payload;
        },
        clearTotalNumberOfPages: (state) => {
            state.totalNumberOfPages = 0;
        },

        setCurrentPage: (state, action: PayloadAction<any>) => {
            state.currentPage = action.payload;
        },
        clearCurrentPage: (state) => {
            state.currentPage = 0;
        },


    },
});

export const {
    setJob,
    clearJob,
    setJobs,
    clearJobs,
    setCurrentPage,
    clearCurrentPage,
    setTotalNumberOfPages,
    clearTotalNumberOfPages,
} = JobSlice.actions; //we can use it in job page
export default JobSlice.reducer;
