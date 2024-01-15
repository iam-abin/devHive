import express from "express"

import { DependenciesData } from "../../types/dependencyInterface";
import { userRouter } from "./user";
import { chatRouter } from "./chat";

import { currentUserCandidateCheck, currentUserRecruiterCheck } from "@abijobportal/common";

export const routes = (dependencies: DependenciesData) =>{
    const router = express.Router();

    const candidate = userRouter(dependencies)
    const recruiter = chatRouter(dependencies)

    router.use("/candidate",currentUserCandidateCheck, candidate)
    router.use("/recruiter",currentUserRecruiterCheck, recruiter)

    return router
}