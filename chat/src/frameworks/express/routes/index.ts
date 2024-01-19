import express from "express"

import { DependenciesData } from "../../types/dependencyInterface";
import { userRouter } from "./user";
import { chatRouter } from "./chat";

import { currentUserCandidateCheck, currentUserRecruiterCheck } from "@abijobportal/common";

export const routes = (dependencies: DependenciesData) =>{
    const router = express.Router();

    const user = userRouter(dependencies)
    const chat = chatRouter(dependencies)


    router.use("/candidate",currentUserCandidateCheck, chat)
    router.use("/recruiter",currentUserRecruiterCheck, chat)

    return router
}