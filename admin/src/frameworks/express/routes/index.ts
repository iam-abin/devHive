import express from "express";
import { checkCurrentUser, auth, ROLES } from "@abijobportal/common";

import { dashboardRouter } from "./dashboard";
import { candidateRouter } from "./candidate";
import { recruiterRouter } from "./recruiter";
import { membershipPlanRouter } from "./membership-plan";
import { jobRouter } from "./job";
import { paymentRouter } from "./payment";
import { IDependency } from "../../types/dependency";


export const routes = (dependencies: IDependency) => {
	const router = express.Router();

	const dashboard = dashboardRouter(dependencies);
	const candidate = candidateRouter(dependencies);
	const recruiter = recruiterRouter(dependencies);
	const membershipPlan = membershipPlanRouter(dependencies);
	const job = jobRouter(dependencies);
	const payment = paymentRouter(dependencies);

	// currentUserAdmin extract current user from jwt, if user is present add it to req.currentUser
	// In admin service every routes are protected for admin.
	router.use(checkCurrentUser);
	router.use(auth(ROLES.ADMIN));

	router.use("/dashboard", dashboard);
	router.use("/candidate", candidate);
	router.use("/recruiter", recruiter);
	router.use("/membership", membershipPlan);
	router.use("/job", job);
	router.use("/payment", payment);

	return router;
};
