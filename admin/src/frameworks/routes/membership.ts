import express from "express"

export const membershipRouter = (dependencies: any)=>{
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