import express from "express";

import { requireAuthCandidate } from "@abijobportal/common";
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
		candidateSignupEmailVerifyController,
	} = candidateControllers(dependencies);

	router.post(
		"/signup",
		signupRequestBodyValidatorMiddlewares,
		candidateSignupController
	);
	
	router.get("/:userId/verifyEmail/:token",candidateSignupEmailVerifyController)

	router.post(
		"/signin",
		signinRequestBodyValidatorMiddlewares,
		candidateSigninController
	);

	
	router.put("/forgotPassword", candidateUpdatePasswordController);

	router.put("/resetPassword", requireAuthCandidate, candidateUpdatePasswordController);

	router.post("/signout", requireAuthCandidate, candidateSignoutController);

	return router;
};
