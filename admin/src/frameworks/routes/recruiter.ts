import express from "express"

import { recruiterControllers } from "../../controllers";
import { DependenciesData } from "../types/dependencyInterface";

export const recruiterRouter = (dependencies: DependenciesData)=>{
    const router = express.Router();

    const { getAllRecruitersController, getRecruiterByIdController,recruiterBlockUnblockController  } = recruiterControllers(dependencies);

    // recruiter
    router.get("/recruiters", getAllRecruitersController);
    router.get("/viewProfile", getRecruiterByIdController);
    router.put("/blockUnblock/:id", recruiterBlockUnblockController);

    return router
}