import express from "express"

import { DependenciesData } from "../types/dependencyInterface";
import { candidateRouter } from "./candidate";
import { recruiterRouter } from "./recruiter";

import { currentUserCandidateCheck, currentUserRecruiterCheck } from "@abijobportal/common";

export const routes = (dependencies: DependenciesData) =>{
    const router = express.Router();

    const candidate = candidateRouter(dependencies)
    const recruiter = recruiterRouter(dependencies)

    router.use("/candidate",currentUserCandidateCheck, candidate)
    router.use("/recruiter",currentUserRecruiterCheck, recruiter)

    return router
}