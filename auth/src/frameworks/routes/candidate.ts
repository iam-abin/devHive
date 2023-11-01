import express from "express";

import { requireAuth } from "@abijobportal/common";
import { candidateControllers } from "../../controllers";
import { signupRequestBodyValidatorMiddlewares } from "../middlewares/signupValidation";
import { signinRequestBodyValidatorMiddlewares } from "../middlewares/signinValidation";
import { DependenciesData } from "../types/dependencyInterface";

export const candidateRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const {
		candidateSignupController,
		candidateSigninController,
		candidateSignoutController,
		candidateUpdatePasswordController,
	} = candidateControllers(dependencies);

	router.post(
		"/signup",
		signupRequestBodyValidatorMiddlewares,
		candidateSignupController
	);
	router.post(
		"/signin",
		signinRequestBodyValidatorMiddlewares,
		candidateSigninController
	);

	// router.post("/signout",requireAuth, candidateSignoutController);
	router.put("/updatePassword", candidateUpdatePasswordController);
	router.post("/signout", candidateSignoutController);

	return router;
};
