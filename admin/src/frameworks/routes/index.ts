import express from "express";
import { currentUserAdminCheck, requireAuthAdmin } from "@abijobportal/common";

import { dashboardRouter } from "./dashboard";
import { candidateRouter } from "./candidate";
import { recruiterRouter } from "./recruiter";
import { membershipRouter } from "./membership";
import { companyRouter } from "./company";
import { jobRouter } from "./job";

import { DependenciesData } from "../types/dependencyInterface";

export const routes = (dependencies: DependenciesData) => {
	const router = express.Router();

	const dashboard = dashboardRouter(dependencies);
	const candidate = candidateRouter(dependencies);
	const recruiter = recruiterRouter(dependencies);
	const membership = membershipRouter(dependencies);
	const company = companyRouter(dependencies);
	const job = jobRouter(dependencies);

	// currentUserAdmin extract current user from jwt, if user is present add it to req.currentUser
	// here every routes are used by admin, so it is easy to understand for us when define it at the top.

	// router.use(currentUserAdminCheck);
	console.log(
		"=========================================================================================="
	);
	router.use(currentUserAdminCheck);
	router.use(requireAuthAdmin);

	router.use("/dashboard", dashboard);
	// router.use("/candidate",requireAuthAdmin, candidate);
	router.use("/candidate", candidate);
	router.use("/recruiter", recruiter);
	router.use("/membership", membership);
	router.use("/company", company);
	router.use("/job", job);

	return router;
};
