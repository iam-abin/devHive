import express from "express"

import { dashboardControllers } from "../../../controllers";

export const dashboardRouter = (dependencies: any)=>{
    const router = express.Router();

    const { dashboardController, getDashboardGraphDetailsController } = dashboardControllers (dependencies);

    // dashboard
    router.get("/data", dashboardController);

    router.get("/graph-data", getDashboardGraphDetailsController);

    return router
}