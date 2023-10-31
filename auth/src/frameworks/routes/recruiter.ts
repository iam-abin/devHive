import express from "express";

import { requireAuth } from "@abijobportal/common";
import { recruiterControllers } from "../../controllers";

import { signupRequestBodyValidatorMiddlewares } from "../middlewares/signupValidation";
import { signinRequestBodyValidatorMiddlewares } from "../middlewares/signinValidation";

export const recruiterRouter = (dependencies: any) => {
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
	router.put("/updatePassword", recruiterUpdatePasswordController);
	router.post("/signout", recruiterSignoutController);

	return router;
};
