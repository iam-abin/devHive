import express from "express";
import { currentUserAdmin, currentUserCandidate, currentUserRecruiter } from "@abijobportal/common";

import { adminRouter } from "./admin";
import { candidateRouter } from "./candidate";
import { recruiterRouter } from "./recruiter";
import { DependenciesData } from "../types/dependencyInterface";

export const routes = (dependencies: DependenciesData) => {
	const router = express.Router();

	const admin = adminRouter(dependencies);
	const candidate = candidateRouter(dependencies);
	const recruiter = recruiterRouter(dependencies);

	router.use("/admin",currentUserAdmin, admin); // currentUserAdmin extract current user from jwt, if user is present add it to req.currentUser
	router.use("/candidate",currentUserCandidate, candidate);
	router.use("/recruiter",currentUserRecruiter, recruiter);

	return router;
};
