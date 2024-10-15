import express, { Router } from "express"
import { IDependenciesData } from "../../types/dependencyInterface";
import { checkCurrentUser, auth, ROLES } from "@abijobportal/common";
import { paymentControllers } from "../../../controllers";

export const paymentRouter = (dependencies: IDependenciesData)=>{
    const router: Router = express.Router();

    const { getAllPaymentsController } = paymentControllers(dependencies);
    
    router.get("/get-all-payments", getAllPaymentsController);
    
    return router
}