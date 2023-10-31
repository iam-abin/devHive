import express from "express";

import { requireAuth } from "@abijobportal/common";
import { candidateControllers } from "../../controllers";


export const candidateRouter = (dependencies: any)=>{
    const router = express.Router();

    const { candidateSignupController, candidateSigninController, candidateSignoutController, candidateUpdatePasswordController } = candidateControllers(dependencies)

    router.post("/signup", candidateSignupController);
    router.post("/signin", candidateSigninController);
    router.post("/signin", candidateSigninController);
    router.put("/updatePassword", candidateUpdatePasswordController);

    // router.post("/signout",requireAuth, candidateSignoutController);
    router.post("/signout", candidateSignoutController);

    return router
}