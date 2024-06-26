import express from "express"
import { requireAuthAdmin } from "@abijobportal/common";

import { jobControllers } from "../../../controllers";
import { IDependenciesData } from "../../types/dependencyInterface";

export const jobRouter = (dependencies: IDependenciesData)=>{
    const router = express.Router();

    const { blockUnblockJobController, viewJobController, viewJobsController  } = jobControllers(dependencies);

    // // job

    // router.get("/jobs", requireAuthAdmin, viewJobsController);
    // router.get("/viewJob", requireAuthAdmin, viewJobController);
    // router.put("/blockUnblock/:id", requireAuthAdmin, blockUnblockJobController);

    router.get("/jobs", viewJobsController);
    router.get("/viewJob/:jobId", viewJobController);
    // router.get("/updateJob", updateJobController);
    router.put("/blockUnblock/:jobId", blockUnblockJobController);

    return router
}