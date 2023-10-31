import express from "express"

export const recruiterRouter = (dependencies: any)=>{
    const router = express.Router();

    // recruiter
    router.get("/recruiters");
    router.get("/viewProfile");
    router.post("/recruiter-blockUnblock/:id");

    return router
}