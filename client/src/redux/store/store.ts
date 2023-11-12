import { configureStore } from "@reduxjs/toolkit";

import rootRedcucer from "../reducer/reducer";

const store  = configureStore({
    reducer: rootRedcucer
})

export default store