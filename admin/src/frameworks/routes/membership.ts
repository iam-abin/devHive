import express from "express"
import { DependenciesData } from "../types/dependencyInterface";

export const membershipRouter = (dependencies: DependenciesData)=>{
    const router = express.Router();

    // recruiter
    router.get("/viewMemberships");
    
    // router.route("/viewMembership/:id")
    router.get("/membership/:id");
    router.post("/membership/:id");
    router.put("/membership/:id");
    router.delete("/membership/:id");

    return router
}