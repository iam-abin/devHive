import express, { Router } from "express";
import { recruiterControllers } from "../../../controllers";
import { IDependenciesData } from "../../types/dependencyInterface";

export const recruiterRouter = (dependencies: IDependenciesData)=>{
    const router: Router = express.Router();

    const recruiterController = recruiterControllers(dependencies);

    
    router.get("/recruiters", recruiterController.getAllRecruitersController);
    router.get("/viewProfile/:userId", recruiterController.getRecruiterByIdController);
    router.put("/blockUnblock/:userId", recruiterController.recruiterBlockUnblockController);
    
    return router
}