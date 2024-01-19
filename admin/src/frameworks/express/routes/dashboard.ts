import express from "express"

export const dashboardRouter = (dependencies: any)=>{
    const router = express.Router();

    // dashboard
    router.get("/dashboard");

    return router
}