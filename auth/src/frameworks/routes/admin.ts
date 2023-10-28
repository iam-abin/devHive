import express from "express"

export const adminRouter = (dependencies: any)=>{
    const router = express.Router();

    router.post("/api/v1/admin/signup");
    router.post("/api/v1/admin/signin");
    router.post("/api/v1/admin/signout");

    return router
}