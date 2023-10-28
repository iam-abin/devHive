import express from "express";
import { candidateControllers } '../../controllers'


export const candidateRouter = (dependencies: any)=>{
    const router = express.Router();

    router.post("/api/v1/candidate/signup");
    router.post("/api/v1/candidate/signin");
    router.post("/api/v1/candidate/signout");

    return router
}