import express from "express"
import { DependenciesData } from "../../types/dependencyInterface";

export const membershipPlanRouter = (dependencies: DependenciesData)=>{
    const router = express.Router();

    // recruiter
    router.get("/view-payments");
    // router.get("/view-membership-plan/:membershipPlanId");
    // router.put("/block-unblock-membership-plan/:membershipPlanId", );
    // router.patch("/update-membership-plan");

    return router
}