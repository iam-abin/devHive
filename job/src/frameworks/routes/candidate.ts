import express from "express";

import { requireAuthCandidate } from "@abijobportal/common";
import { candidateJobControllers } from "../../controllers";
// import { signupRequestBodyValidatorMiddlewares } from "../middlewares/signupValidation";
// import { signinRequestBodyValidatorMiddlewares } from "../middlewares/signinValidation";
import { DependenciesData } from "../types/dependencyInterface";

export const candidateRouter = (dependencies: DependenciesData) => {
	const router = express.Router();
	console.log("routeeeeeeeeeee");
	

	const {
		applyJobController,
		filterJobCandidateController,
		viewAllJobsCandidateController,
		viewJobCandidateController
	} = candidateJobControllers(dependencies);

	router.get("/", viewAllJobsCandidateController);
	
	router.get("/:id",viewJobCandidateController);

	router.post("/filter",filterJobCandidateController);
	
	router.post("/apply", applyJobController);

	return router;
};
