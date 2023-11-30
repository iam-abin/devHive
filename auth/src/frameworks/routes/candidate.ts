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
		candidateSendOtpController,
		candidateVerifyOtpController
	} = candidateControllers(dependencies);

	router.post(
		"/signup",
		signupRequestBodyValidatorMiddlewares,
		candidateSignupController
	);
	
	router.post("/:userId/verifyEmail/:token",candidateSignupEmailVerifyController)
	// router.post("/verifyEmail",candidateSignupEmailVerifyController)
	router.post(
		"/signin",
		signinRequestBodyValidatorMiddlewares,
		candidateSigninController
	);

	
	// router.put("/forgotPassword",requireAuthCandidate, candidateUpdatePasswordController);
	router.put("/forgotPassword",requireAuthCandidate, candidateUpdatePasswordController);

	router.post("/sendOtp", candidateSendOtpController);

	router.post("/verifyOtp", candidateVerifyOtpController);
	
	// router.put("/resetPassword", candidateUpdatePasswordController);
	router.put("/resetPassword", requireAuthCandidate, candidateUpdatePasswordController);

	// router.post("/signout", requireAuthCandidate, candidateSignoutController);
	router.post("/signout", candidateSignoutController);

	return router;
};
