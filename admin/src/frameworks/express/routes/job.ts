import express, { Router } from "express"
import { jobControllers } from "../../../controllers";
import { IDependenciesData } from "../../types/dependencyInterface";

export const jobRouter = (dependencies: IDependenciesData)=>{
    const router: Router = express.Router();

    const { blockUnblockJobController, viewJobController, viewJobsController  } = jobControllers(dependencies);

    router.get("/jobs", viewJobsController);
    router.get("/viewJob/:jobId", viewJobController);
    router.put("/blockUnblock/:jobId", blockUnblockJobController);

    return router
}