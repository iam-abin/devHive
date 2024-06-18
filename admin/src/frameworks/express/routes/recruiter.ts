import express from "express"
import { requireAuthAdmin } from "@abijobportal/common";

import { recruiterControllers } from "../../../controllers";
import { IDependenciesData } from "../../types/dependencyInterface";

export const recruiterRouter = (dependencies: IDependenciesData)=>{
    const router = express.Router();

    const { getAllRecruitersController, getRecruiterByIdController,recruiterBlockUnblockController  } = recruiterControllers(dependencies);

    // recruiter
    router.get("/recruiters", getAllRecruitersController);
    router.get("/viewProfile/:userId", getRecruiterByIdController);
    router.put("/blockUnblock/:userId", recruiterBlockUnblockController);

    // router.get("/recruiters", requireAuthAdmin, getAllRecruitersController);
    // router.get("/viewProfile/:userId", requireAuthAdmin, getRecruiterByIdController);
    // router.put("/blockUnblock/:userId", requireAuthAdmin, recruiterBlockUnblockController);

    return router
}