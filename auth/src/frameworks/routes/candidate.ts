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
	router.put("/forgotPassword", candidateUpdatePasswordController);
	router.put("/resetPassword", requireAuth, candidateUpdatePasswordController);
	router.post("/signout", requireAuth, candidateSignoutController);

	return router;
};
