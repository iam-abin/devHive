import express, { Router } from "express";
import { recruiterControllers } from "../../../controllers";
import { IDependency } from "../../types/dependency";

export const recruiterRouter = (dependencies: IDependency)=>{
    const router: Router = express.Router();

    const recruiterController = recruiterControllers(dependencies);


    router.get("/recruiters/:page/:limit", recruiterController.getAllRecruitersController);
    router.get("/viewProfile/:userId", recruiterController.getRecruiterByIdController);
    router.put("/blockUnblock/:userId", recruiterController.recruiterBlockUnblockController);
    
    return router
}