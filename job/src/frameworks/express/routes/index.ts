import express from "express";

import { candidateRouter } from "./candidate";
import { recruiterRouter } from "./recruiter";

import { IDependency } from "../../types/dependencyInterface";

export const routes = (dependencies: IDependency) => {
    const router = express.Router();

    const candidate = candidateRouter(dependencies);
    const recruiter = recruiterRouter(dependencies);

    router.use("/candidate", candidate);
    router.use("/recruiter", recruiter);

    return router;
};
