import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface JobSlice {
    job: any;
    changeDeleteStatus: boolean;
}
const initialState: JobSlice = {
    job: {},
    changeDeleteStatus: false,
};

const JobSlice = createSlice({
    name: "jobs-data",
    initialState,
    reducers: {
        setJob: (state, action: PayloadAction<any>) => {
            state.job = action.payload;
        },
        clearJob: (state) => {
            state.job = {};
        },
    },
});

export const { setJob, clearJob } = JobSlice.actions; //we can use it in job page
export default JobSlice.reducer;
