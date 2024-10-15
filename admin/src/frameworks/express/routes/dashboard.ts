import express, { Router } from "express"
import { dashboardControllers } from "../../../controllers";
import { IDependenciesData } from "../../types/dependencyInterface";

export const dashboardRouter = (dependencies: IDependenciesData)=>{
    const router: Router = express.Router();

    const dashboardController = dashboardControllers (dependencies);

    // dashboard
    router.get("/data", dashboardController.dashboardController);

    router.get("/graph-data", dashboardController.getDashboardGraphDetailsController);

    return router
}