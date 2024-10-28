import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IJob } from "../../types/Job";

interface IJobSlice {
    job: IJob | null;
    jobs: IJob[];
    isFIltering: boolean;
    currentPage: number;
    totalNumberOfPages: number;
}
const initialState: IJobSlice = {
    job: null,
    jobs: [],
    isFIltering: false,
    totalNumberOfPages: 0,
    currentPage: 0,
};

const JobSlice = createSlice({
    name: "jobs-data",
    initialState,
    reducers: {
        setJob: (state, action: PayloadAction<IJob>) => {
            state.job = action.payload;
        },
        clearJob: (state) => {
            state.job = null;
        },

        setJobs: (state, action: PayloadAction<IJob[]>) => {
            state.jobs = action.payload;
        },
        clearJobs: (state) => {
            state.jobs = [];
        },

        setTotalNumberOfPages: (state, action: PayloadAction<number>) => {
            state.totalNumberOfPages = action.payload;
        },
        clearTotalNumberOfPages: (state) => {
            state.totalNumberOfPages = 0;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
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
