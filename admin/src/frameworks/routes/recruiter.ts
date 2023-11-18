import express from "express"
import { requireAuthAdmin } from "@abijobportal/common";

import { recruiterControllers } from "../../controllers";
import { DependenciesData } from "../types/dependencyInterface";

export const recruiterRouter = (dependencies: DependenciesData)=>{
    const router = express.Router();

    const { getAllRecruitersController, getRecruiterByIdController,recruiterBlockUnblockController  } = recruiterControllers(dependencies);

    // // recruiter
    // router.get("/recruiters",requireAuthAdmin, getAllRecruitersController);
    // router.get("/viewProfile",requireAuthAdmin, getRecruiterByIdController);
    // router.put("/blockUnblock/:id",requireAuthAdmin, recruiterBlockUnblockController);

    router.get("/recruiters", getAllRecruitersController);
    router.get("/viewProfile", getRecruiterByIdController);
    router.put("/blockUnblock/:id", recruiterBlockUnblockController);

    return router
}