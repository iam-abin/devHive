import express from "express"

import { IDependenciesData } from "../../types/dependencyInterface";
// import { userRouter } from "./user";
import { candidateRouter } from "./candidate";
import { recruiterRouter } from "./recruiter";

import { currentUserCandidateCheck, currentUserRecruiterCheck } from "@abijobportal/common";

export const routes = (dependencies: IDependenciesData) =>{
    const router = express.Router();

    const candidate = candidateRouter(dependencies)
    const recruiter = recruiterRouter(dependencies)


    router.use("/candidate",currentUserCandidateCheck, candidate)
    router.use("/recruiter",currentUserRecruiterCheck, recruiter)

    return router
}