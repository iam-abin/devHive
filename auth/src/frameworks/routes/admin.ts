import express from "express"

import { adminControllers } from "../../controllers";
import { signinRequestBodyValidatorMiddlewares } from "../middlewares/signinValidation";

export const adminRouter = (dependencies: any)=>{
    const router = express.Router();

    const { adminSigninController, adminSignoutController } = adminControllers(dependencies)

    router.post("/signin", signinRequestBodyValidatorMiddlewares, adminSigninController);
    router.post("/signout", adminSignoutController);

    return router
}