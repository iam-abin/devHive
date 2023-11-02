import express from "express"
import { DependenciesData } from "../types/dependencyInterface";

export const recruiterRouter = (dependencies: DependenciesData)=>{
    const router = express.Router();

    // recruiter
    router.get("/recruiters");
    router.get("/viewProfile");
    router.put("/recruiter-blockUnblock/:id");

    return router
}