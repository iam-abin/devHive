import express, { Router } from "express"
import { jobControllers } from "../../../controllers";
import { IDependenciesData } from "../../types/dependencyInterface";

export const jobRouter = (dependencies: IDependenciesData)=>{
    const router: Router = express.Router();

    const jobController = jobControllers(dependencies);

    router.get("/jobs", jobController.viewJobsController);
    router.get("/viewJob/:jobId", jobController.viewJobController);
    router.put("/blockUnblock/:jobId", jobController.blockUnblockJobController);

    return router
}