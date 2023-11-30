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
		recruiterSignupEmailVerifyController
	} = recruiterControllers(dependencies);

	router.post(
		"/signup",
		signupRequestBodyValidatorMiddlewares,
		recruiterSignupController
	);

	router.post("/:userId/verifyEmail/:token",recruiterSignupEmailVerifyController)
	// router.post("/verifyEmail",recruiterSignupEmailVerifyController)

	router.post(
		"/signin",
		signinRequestBodyValidatorMiddlewares,
		recruiterSigninController
	);

	router.put("/forgotPassword", recruiterUpdatePasswordController);

	router.put("/resetPassword", requireAuthRecruiter, recruiterUpdatePasswordController);
	// router.put("/resetPassword", recruiterUpdatePasswordController);

	router.post("/signout", recruiterSignoutController);

	return router;
};
