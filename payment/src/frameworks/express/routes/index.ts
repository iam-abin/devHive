import express from "express"

import { DependenciesData } from "../../types/dependencyInterface";
// import { userRouter } from "./user";
import { paymentRouter } from "./payment";

import { currentUserCandidateCheck } from "@abijobportal/common";

export const routes = (dependencies: DependenciesData) =>{
    const router = express.Router();

    // const user = userRouter(dependencies)
    const payment = paymentRouter(dependencies)


    // router.use("/recruiter",currentUserCandidateCheck, user)
    router.use("/candidate",currentUserCandidateCheck, payment)

    return router
}