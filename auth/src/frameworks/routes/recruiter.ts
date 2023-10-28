import express from "express"

export const recruiterRouter = (dependencies: any)=>{
    const router = express.Router();

    router.post("/api/v1/recruiter/signup",[
        
    ]);
    router.post("/api/v1/recruiter/signin");
    router.post("/api/v1/recruiter/signout");

    return router
}