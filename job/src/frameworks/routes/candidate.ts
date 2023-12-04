import express from "express";

import { requireAuthCandidate } from "@abijobportal/common";
import { candidateJobControllers } from "../../controllers";
// import { signupRequestBodyValidatorMiddlewares } from "../middlewares/signupValidation";
// import { signinRequestBodyValidatorMiddlewares } from "../middlewares/signinValidation";
import { DependenciesData } from "../types/dependencyInterface";

export const candidateRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const {
		viewAllJobsController,
		viewJobController,
		applyJobController,
		filterJobController
	} = candidateJobControllers(dependencies);

	router.get("/", viewAllJobsController);
	
	router.get("/:slug",viewJobController);

	router.post("/filter",filterJobController);
	
	router.post("/apply", applyJobController);

	return router;
};
