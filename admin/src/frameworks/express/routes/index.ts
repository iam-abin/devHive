import express from "express";
import { currentUserAdminCheck, requireAuthAdmin } from "@abijobportal/common";

import { dashboardRouter } from "./dashboard";
import { candidateRouter } from "./candidate";
import { recruiterRouter } from "./recruiter";
import { membershipPlanRouter } from "./membership-plan";
import { companyRouter } from "./company";
import { jobRouter } from "./job";
import { paymentRouter } from "./payment";

import { DependenciesData } from "../../types/dependencyInterface";

export const routes = (dependencies: DependenciesData) => {
	const router = express.Router();

	const dashboard = dashboardRouter(dependencies);
	const candidate = candidateRouter(dependencies);
	const recruiter = recruiterRouter(dependencies);
	const membershipPlan = membershipPlanRouter(dependencies);
	const company = companyRouter(dependencies);
	const job = jobRouter(dependencies);
	const payment = paymentRouter(dependencies);

	// currentUserAdmin extract current user from jwt, if user is present add it to req.currentUser
	// here every routes are used by admin, so it is easy to understand for us when define it at the top.

	console.log(
		"=========================================================================================="
	);
	router.use(currentUserAdminCheck);
	router.use(requireAuthAdmin);

	router.use("/dashboard", dashboard);
	// router.use("/candidate",requireAuthAdmin, candidate);
	router.use("/candidate", candidate);
	router.use("/recruiter", recruiter);
	router.use("/membership", membershipPlan);
	router.use("/company", company);
	router.use("/job", job);
	router.use("/payment", payment);

	return router;
};
