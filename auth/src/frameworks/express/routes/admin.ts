import express from "express"
import { requireAuthAdmin } from "@abijobportal/common";

import { adminControllers } from "../../../controllers";
import { signinRequestBodyValidatorMiddlewares } from "../../middlewares/signinValidation";
import { IDependenciesData } from "../../types/dependencyInterface";

export const adminRouter = (dependencies: IDependenciesData)=>{
    const router = express.Router();

    const { adminSigninController, adminSignoutController } = adminControllers(dependencies)
    
    router.post("/signin", signinRequestBodyValidatorMiddlewares, adminSigninController);
    router.post("/signout" ,requireAuthAdmin ,adminSignoutController);  

    return router
}