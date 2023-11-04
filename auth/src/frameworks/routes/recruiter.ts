import express from "express";

import { requireAuthRecruiter } from "@abijobportal/common";
import { recruiterControllers } from "../../controllers";
import { signupRequestBodyValidatorMiddlewares } from "../middlewares/signupValidation";
import { signinRequestBodyValidatorMiddlewares } from "../middlewares/signinValidation";
import { DependenciesData } from "../types/dependencyInterface";

export const recruiterRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const {
		recruiterSignupController,
		recruiterSigninController,
		recruiterSignoutController,
		recruiterUpdatePasswordController,
	} = recruiterControllers(dependencies);

	router.post(
		"/signup",
		signupRequestBodyValidatorMiddlewares,
		recruiterSignupController
	);
	router.post(
		"/signin",
		signinRequestBodyValidatorMiddlewares,
		recruiterSigninController
	);

	// router.post("/signout",requireAuth, candidateSignoutController);
	router.put("/forgotPassword", recruiterUpdatePasswordController);
	router.put("/resetPassword", requireAuthRecruiter, recruiterUpdatePasswordController);
	router.post("/signout", requireAuthRecruiter, recruiterSignoutController);

	return router;
};
