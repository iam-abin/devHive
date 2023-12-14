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

	router
		.route("/:id")
		// .all(requireAuthRecruiter)
		.get(viewJobByJobIdController)
		.delete(deleteJobController);

	router.patch("/update-job",  updateJobController);

	router.get("/created-jobs/:recruiterId",  createdJobsByRecruiterController);
	
	router.get("/job-applications/:id",  viewJobApplicationsController);



	// router.patch('/change-status/:id', requireAuthRecruiter, changeTheApplicationStatus);

	return router;
};
