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
		viewJobApplicationsController,
	} = recruiterJobControllers(dependencies);

	router.get("/", viewAllJobsController);
	router.get("/:id", viewJobByJobIdController);

	router.post("/filter", filterJobsController);

	router.use(requireAuthRecruiter);

	router.post("/create", createJobController);

	router.patch("/update-job", updateJobController);
	
	router.delete("/:id", deleteJobController);

	router.get("/created-jobs/:recruiterId", createdJobsByRecruiterController);

	router.get("/job-applications/:id", viewJobApplicationsController);

	// router.patch('/change-status/:id', requireAuthRecruiter, changeTheApplicationStatus);

	return router;
};
