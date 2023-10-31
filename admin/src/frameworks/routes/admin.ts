import express from "express"

export const adminRouter = (dependencies: any)=>{
    const router = express.Router();

    // dashboard
    router.post("/dashboard");

    // candidate
    router.post("/signout");

    return router
}