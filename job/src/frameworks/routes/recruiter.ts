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

	router.post("/create", createJobController);
	
	router.get("/", viewAllJobsRecruiterController);
	
	router.route("/:id").get(viewJobRecruiterController).patch(updateJobController).delete(deleteJobController);

	router.post("/filter", filterJobRecruiterController);

	return router;
};
