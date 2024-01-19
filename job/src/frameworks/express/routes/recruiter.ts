import express from "express";

import { requireAuthRecruiter } from "@abijobportal/common";
import { jobsController, recruiterJobControllers } from "../../../controllers";
// import { signupRequestBodyValidatorMiddlewares } from "../middlewares/signupValidation";
// import { signinRequestBodyValidatorMiddlewares } from "../middlewares/signinValidation";
import { DependenciesData } from "../../types/dependencyInterface";

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
		viewJobApplicationController,
		changeJobApplicationStatusController,
	} = recruiterJobControllers(dependencies);

	router.get("/all-jobs/:page", viewAllJobsController);

	router.get("/:id", viewJobByJobIdController);

	router.post("/filter", filterJobsController);

	router.use(requireAuthRecruiter);

	router.post("/create", createJobController);

	router.patch("/update-job", updateJobController);
	
	router.delete("/:id", deleteJobController);

	router.get("/created-jobs/:recruiterId", createdJobsByRecruiterController);

	router.get("/job-applications/:recruiterId", viewJobApplicationsController);

	router.get("/job-application/:jobApplicationId", viewJobApplicationController);

	router.post("/change-application-status/:jobApplicationId", changeJobApplicationStatusController);
	
	return router;
};
