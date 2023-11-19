import express from "express"

import { DependenciesData } from "../types/dependencyInterface";
import { candidateRouter } from "./candidate";
import { recruiterRouter } from "./recruiter";

export const routes = (dependencies: DependenciesData) =>{
    const router = express.Router();

    const candidate = candidateRouter(dependencies)
    const recruiter = recruiterRouter(dependencies)

    router.use("/candidate", candidate)
    router.use("/recruiter", recruiter)

    return router
}