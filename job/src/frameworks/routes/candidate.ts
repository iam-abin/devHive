import express from "express";

import { requireAuthCandidate } from "@abijobportal/common";
import { jobsController, candidateJobControllers } from "../../controllers";
// import { signupRequestBodyValidatorMiddlewares } from "../middlewares/signupValidation";
// import { signinRequestBodyValidatorMiddlewares } from "../middlewares/signinValidation";
import { DependenciesData } from "../types/dependencyInterface";

export const candidateRouter = (dependencies: DependenciesData) => {
	const router = express.Router();
	console.log("routeeeeeeeeeee");

	const {
		viewAllJobsController,
		filterJobsController,
		viewJobByJobIdController,
	} = jobsController(dependencies);

	const { applyJobController, appliedJobsController } =
		candidateJobControllers(dependencies);

	router.get("/", viewAllJobsController);

	router.get("/:id", viewJobByJobIdController);

	router.post("/filter", filterJobsController);

	router.post("/apply",  applyJobController);

	router.get("/appliedJobs",  appliedJobsController);

	return router;
};
