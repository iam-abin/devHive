import express from "express";

import { dashboardRouter } from "./dashboard";
import { candidateRouter } from "./candidate";
import { recruiterRouter } from "./recruiter";
import { membershipRouter } from "./membership";
import { companyRouter } from "./company";
import { DependenciesData } from "../types/dependencyInterface";

export const routes = (dependencies: DependenciesData) => {
	const router = express.Router();

	const dashboard = dashboardRouter(dependencies);
	const candidate = candidateRouter(dependencies);
	const recruiter = recruiterRouter(dependencies);
	const membership = membershipRouter(dependencies);
	const company = companyRouter(dependencies);

	router.use("/dashboard", dashboard);
	router.use("/candidate", candidate);
	router.use("/recruiter", recruiter);
	router.use("/membership", membership);
	router.use("/company", company);

	return router;
};
