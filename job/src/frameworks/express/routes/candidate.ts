import express from "express";

import { currentUserCandidateCheck, requireAuthCandidate } from "@abijobportal/common";
import { jobsController, candidateJobControllers } from "../../../controllers";
// import { signupRequestBodyValidatorMiddlewares } from "../middlewares/signupValidation";
// import { signinRequestBodyValidatorMiddlewares } from "../middlewares/signinValidation";
import { DependenciesData } from "../../types/dependencyInterface";


export const candidateRouter = (dependencies: DependenciesData) => {
	const router = express.Router();
	
	const {
		viewAllJobsController,
		filterJobsController,
		viewJobByJobIdController,
		viewAllJobFieldsDistinctValuesController,
		searchJobsController,
	} = jobsController(dependencies);

	const { applyJobController, appliedJobsController, viewPliedJobApplicationController } =
		candidateJobControllers(dependencies);

	// This route is to get all jobs. It's a post req because i am passing some data to server.
	router.get("/all-jobs/:page", currentUserCandidateCheck, viewAllJobsController);

	router.post("/all-job-fields-distinct-values", viewAllJobFieldsDistinctValuesController);

	router.get("/:id", viewJobByJobIdController);

	router.post("/filter", filterJobsController);

	router.post("/search/:page", searchJobsController);

	router.use(requireAuthCandidate);

	router.post("/apply", applyJobController);

	router.get("/applied-jobs/:candidateId/:page", appliedJobsController);

	router.get("/job-application/:jobApplicationId", viewPliedJobApplicationController);

	return router;
};
