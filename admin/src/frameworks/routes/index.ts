import express from "express";
import { currentUserAdminCheck, requireAuthAdmin } from "@abijobportal/common";

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

	// currentUserAdmin extract current user from jwt, if user is present add it to req.currentUser
	// here every routes are used by admin, so it is easy to understand for us when define it at the top.

	// router.use(currentUserAdminCheck);
	console.log("==========================================================================================");
	

	router.use("/dashboard", currentUserAdminCheck, dashboard);
	// router.use("/candidate",requireAuthAdmin, candidate);
	router.use("/candidate", currentUserAdminCheck, candidate);
	router.use("/recruiter", currentUserAdminCheck, recruiter);
	router.use("/membership", currentUserAdminCheck, membership);
	router.use("/company", currentUserAdminCheck, company);

	return router;
};
