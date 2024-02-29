import express from "express"

import { dashboardControllers } from "../../../controllers";

export const dashboardRouter = (dependencies: any)=>{
    const router = express.Router();

    const { dashboardController } = dashboardControllers (dependencies);

    // dashboard
    router.get("/data", dashboardController);

    return router
}