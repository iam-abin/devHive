import express from "express";

import { requireAuthCandidate } from "@abijobportal/common";
import { candidateControllers, otpControllers, passwordUpdateControllers } from "../../controllers";
import { signupRequestBodyValidatorMiddlewares } from "../middlewares/signupValidation";
import { signinRequestBodyValidatorMiddlewares } from "../middlewares/signinValidation";
import { DependenciesData } from "../types/dependencyInterface";

export const candidateRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const {
		candidateSignupController,
		candidateSigninController,
		candidateSignoutController,
		candidateSignupEmailOtpVerificationController,
	} = candidateControllers(dependencies);

	const { sendOtpTwilioController, verifyOtpTwilioController} = otpControllers(dependencies);

	const { updatePasswordController } = passwordUpdateControllers(dependencies)

	router.post(
		"/signup",
		signupRequestBodyValidatorMiddlewares,
		candidateSignupController
	);
	
	router.post("/verifyEmail",candidateSignupEmailOtpVerificationController)
	// router.post("/verifyEmail",candidateSignupEmailVerifyController)
	router.post(
		"/signin",
		signinRequestBodyValidatorMiddlewares,
		candidateSigninController
	);

	
	// router.put("/forgotPassword",requireAuthCandidate, updatePasswordController);
	router.put("/forgotPassword",requireAuthCandidate, updatePasswordController);

	router.post("/sendOtp", sendOtpTwilioController);

	router.post("/verifyOtp", verifyOtpTwilioController);
	
	// router.put("/resetPassword", updatePasswordController);
	router.put("/resetPassword", requireAuthCandidate, updatePasswordController);

	// router.post("/signout", requireAuthCandidate, candidateSignoutController);
	router.post("/signout", candidateSignoutController);

	return router;
};
