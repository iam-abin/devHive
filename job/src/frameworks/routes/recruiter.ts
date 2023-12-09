import express from "express";

import { requireAuthRecruiter } from "@abijobportal/common";
import { jobsController, recruiterJobControllers } from "../../controllers";
// import { signupRequestBodyValidatorMiddlewares } from "../middlewares/signupValidation";
// import { signinRequestBodyValidatorMiddlewares } from "../middlewares/signinValidation";
import { DependenciesData } from "../types/dependencyInterface";

export const recruiterRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const {
		viewAllJobsController,
		filterJobsController,
		viewJobByJobIdController,
	} = jobsController(dependencies);

	const {
		createJobController,
		updateJobController,
		deleteJobController,
		createdJobsByRecruiterController,
		viewJobApplicationsController
	} = recruiterJobControllers(dependencies);

	
	router.get("/", viewAllJobsController);

	router.post("/filter", filterJobsController);

	router.post("/create",  createJobController);

	router.get("/created-jobs/:id",  createdJobsByRecruiterController);
	
	router.get("/job-applications/:id",  viewJobApplicationsController);

	router
		.route("/:id")
		// .all(requireAuthRecruiter)
		.get(viewJobByJobIdController)
		.patch(updateJobController)
		.delete(deleteJobController);


	// router.patch('/change-status/:id', requireAuthRecruiter, changeTheApplicationStatus);

	return router;
};
