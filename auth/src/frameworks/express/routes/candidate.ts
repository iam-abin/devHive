import express from "express";

import { requireAuthCandidate } from "@abijobportal/common";
import { candidateControllers, otpControllers, passwordUpdateControllers } from "../../../controllers";
import { signupRequestBodyValidatorMiddlewares } from "../../middlewares/signupValidation";
import { signinRequestBodyValidatorMiddlewares } from "../../middlewares/signinValidation";
import { IDependenciesData } from "../../types/dependencyInterface";

export const candidateRouter = (dependencies: IDependenciesData) => {
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

	router.post(
		"/signin",
		signinRequestBodyValidatorMiddlewares,
		candidateSigninController
	);

	router.put("/forgotPassword", updatePasswordController);

	router.post("/sendOtp",requireAuthCandidate, sendOtpTwilioController);

	router.post("/verifyOtp",requireAuthCandidate, verifyOtpTwilioController);
	
	router.put("/resetPassword", requireAuthCandidate, updatePasswordController);

	router.post("/signout", requireAuthCandidate, candidateSignoutController);

	return router;
};
