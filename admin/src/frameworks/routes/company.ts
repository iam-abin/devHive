import express from "express"
import { DependenciesData } from "../types/dependencyInterface";

export const companyRouter = (dependencies: DependenciesData)=>{
    const router = express.Router();

    // company
    // router.get("/candidates");
    // router.get("/viewProfile");
    // router.put("/company-blockUnblock/:id");

    return router
}