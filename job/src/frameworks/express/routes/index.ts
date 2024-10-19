import express from "express";

import { candidateRouter } from "./candidate";
import { recruiterRouter } from "./recruiter";

import { IDependency } from "../../types/dependencyInterface";
import { checkCurrentUser } from "@abijobportal/common";

export const routes = (dependencies: IDependency) => {
    const router = express.Router();

    const candidate = candidateRouter(dependencies);
    const recruiter = recruiterRouter(dependencies);

    router.use("/candidate", checkCurrentUser, candidate);
    router.use("/recruiter", checkCurrentUser, recruiter);

    return router;
};
