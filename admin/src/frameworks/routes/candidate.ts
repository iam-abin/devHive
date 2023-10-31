import express from "express"

export const candidateRouter = (dependencies: any)=>{
    const router = express.Router();

    // candidate
    router.get("/candidates");
    router.get("/viewProfile");
    router.put("/candidate-blockUnblock/:id");

    return router
}