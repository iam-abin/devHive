import express from "express"
import { DependenciesData } from "../types/dependencyInterface";

export const candidateRouter = (dependencies: DependenciesData)=>{
    const router = express.Router();

    // candidate
    router.get("/candidates");
    router.get("/viewProfile");
    router.put("/candidate-blockUnblock/:id");

    return router
}