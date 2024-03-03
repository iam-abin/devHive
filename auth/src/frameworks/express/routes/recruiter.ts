import express from "express";

import { requireAuthRecruiter } from "@abijobportal/common";
import { otpControllers, passwordUpdateControllers, recruiterControllers  } from "../../../controllers";
import { signupRequestBodyValidatorMiddlewares } from "../../middlewares/signupValidation";
import { signinRequestBodyValidatorMiddlewares } from "../../middlewares/signinValidation";
import { DependenciesData } from "../../types/dependencyInterface";

export const recruiterRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const {
		recruiterSignupController,
		recruiterSigninController,
		recruiterSignoutController,
		recruiterSignupEmailOtpVerificationController,
	} = recruiterControllers(dependencies);

	const { sendOtpTwilioController, verifyOtpTwilioController} = otpControllers(dependencies);

	const { updatePasswordController } = passwordUpdateControllers(dependencies);

	router.post(
		"/signup",
		signupRequestBodyValidatorMiddlewares,
		recruiterSignupController
	);

	router.post("/verifyEmail",recruiterSignupEmailOtpVerificationController);

	router.post(
		"/signin",
		signinRequestBodyValidatorMiddlewares,
		recruiterSigninController
	);

	router.put("/forgotPassword", updatePasswordController);

	router.post("/sendOtp",requireAuthRecruiter, sendOtpTwilioController);

	router.post("/verifyOtp",requireAuthRecruiter, verifyOtpTwilioController);

	router.put("/resetPassword", requireAuthRecruiter, updatePasswordController);

	router.post("/signout", recruiterSignoutController);

	return router;
};
