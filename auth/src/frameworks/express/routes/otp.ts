import express from "express";

import { requireAuthCandidate } from "@abijobportal/common";
import { otpControllers } from "../../../controllers";
import { DependenciesData } from "../../types/dependencyInterface";

export const otpRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const {
		sendOtpNodemailerController,
        verifyOtpNodemailerController
	} = otpControllers(dependencies);

	router.post("/sendOtp",  sendOtpNodemailerController);

	router.post("/verify-forgotPassword-otp", verifyOtpNodemailerController);
	
	return router;
};
