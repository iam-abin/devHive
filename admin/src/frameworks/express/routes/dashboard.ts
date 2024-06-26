import express from "express"

import { dashboardControllers } from "../../../controllers";
import { IDependenciesData } from "../../types/dependencyInterface";

export const dashboardRouter = (dependencies: IDependenciesData)=>{
    const router = express.Router();

    const { dashboardController, getDashboardGraphDetailsController } = dashboardControllers (dependencies);

    // dashboard
    router.get("/data", dashboardController);

    router.get("/graph-data", getDashboardGraphDetailsController);

    return router
}