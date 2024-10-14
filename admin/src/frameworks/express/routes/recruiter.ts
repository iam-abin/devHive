import express, { Router } from "express";
import { recruiterControllers } from "../../../controllers";
import { IDependenciesData } from "../../types/dependencyInterface";

export const recruiterRouter = (dependencies: IDependenciesData)=>{
    const router: Router = express.Router();

    const { getAllRecruitersController, getRecruiterByIdController,recruiterBlockUnblockController  } = recruiterControllers(dependencies);

    router.get("/recruiters", getAllRecruitersController);
    router.get("/viewProfile/:userId", getRecruiterByIdController);
    router.put("/blockUnblock/:userId", recruiterBlockUnblockController);
    
    return router
}