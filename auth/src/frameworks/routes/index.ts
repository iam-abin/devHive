import express from "express";

import { adminRouter } from "./admin";
import { candidateRouter } from "./candidate";
import { recruiterRouter } from "./recruiter";
import { DependenciesData } from "../types/dependencyInterface";

export const routes = (dependencies: DependenciesData) => {
	const router = express.Router();

	const admin = adminRouter(dependencies);
	const candidate = candidateRouter(dependencies);
	const recruiter = recruiterRouter(dependencies);

	router.use("/admin", admin);
	router.use("/candidate", candidate);
	router.use("/recruiter", recruiter);

	return router;
};
