import express from "express";

import { requireAuthCandidate } from "@abijobportal/common";
import { jobsController, candidateJobControllers } from "../../../controllers";
// import { signupRequestBodyValidatorMiddlewares } from "../middlewares/signupValidation";
// import { signinRequestBodyValidatorMiddlewares } from "../middlewares/signinValidation";
import { DependenciesData } from "../../types/dependencyInterface";

export const candidateRouter = (dependencies: DependenciesData) => {
	const router = express.Router();
	console.log("routeeeeeeeeeee");

	const {
		viewAllJobsController,
		filterJobsController,
		viewJobByJobIdController,
		viewAllJobFieldsDistinctValuesController,
	} = jobsController(dependencies);

	const { applyJobController, appliedJobsController } =
		candidateJobControllers(dependencies);

	router.get("/all-jobs/:page", viewAllJobsController);

	router.get("/all-job-fields-distinct-values", viewAllJobFieldsDistinctValuesController);

	router.get("/:id", viewJobByJobIdController);

	router.post("/filter", filterJobsController);

	router.use(requireAuthCandidate);

	router.post("/apply", applyJobController);

	router.get("/applied-jobs/:candidateId/:page", appliedJobsController);

	return router;
};
