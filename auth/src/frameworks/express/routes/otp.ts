import express from "express";

import { otpControllers } from "../../../controllers";
import { IDependenciesData } from "../../types/dependencyInterface";

export const otpRouter = (dependencies: IDependenciesData) => {
	const router = express.Router();

	const {
		sendOtpNodemailerController,
        verifyOtpNodemailerController
	} = otpControllers(dependencies);

	router.post("/sendOtp",  sendOtpNodemailerController);

	router.post("/verify-forgotPassword-otp", verifyOtpNodemailerController);
	
	return router;
};
