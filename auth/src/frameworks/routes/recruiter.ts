import express from "express";

import { currentUserRecruiter, requireAuthRecruiter } from "@abijobportal/common";
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

	router.put("/forgotPassword", recruiterUpdatePasswordController);
	router.put("/resetPassword", requireAuthRecruiter, recruiterUpdatePasswordController);
	router.post("/signout", requireAuthRecruiter, recruiterSignoutController);

	return router;
};
