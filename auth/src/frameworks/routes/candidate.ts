import express from "express";
import { candidateControllers } from "../../controllers";


export = (dependencies: any)=>{
    const router = express.Router();

    const { candidateSignupController } = candidateControllers(dependencies)

    router.post("/signup", candidateSignupController);
    router.post("/signin", );
    router.post("/signout");

    return router
}