import express from "express";

import { requireAuthRecruiter } from "@abijobportal/common";
import { recruiterJobControllers } from "../../controllers";
// import { signupRequestBodyValidatorMiddlewares } from "../middlewares/signupValidation";
// import { signinRequestBodyValidatorMiddlewares } from "../middlewares/signinValidation";
import { DependenciesData } from "../types/dependencyInterface"; 


export const recruiterRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const {
		createJobController,
		updateJobController,
		viewAllJobsRecruiterController,
		viewJobRecruiterController,
		filterJobRecruiterController,
		deleteJobController
	} = recruiterJobControllers(dependencies);

	router.get("/", viewAllJobsRecruiterController);
	
	router.route("/:slug").get(viewJobRecruiterController).patch(updateJobController).delete(deleteJobController);
	
	router.post("/create", createJobController);

	router.post("/filter", filterJobRecruiterController);

	return router;
};
