import express from "express"

export const recruiterRouter = (dependencies: any)=>{
    const router = express.Router();

    router.post("/signup",[
        
    ]);
    router.post("/signin");
    router.post("/signout");

    return router
}