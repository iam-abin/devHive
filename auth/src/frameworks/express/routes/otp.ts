import express from "express";

import { otpControllers } from "../../../controllers";
import { IDependenciesData } from "../../types/dependencyInterface";

export const otpRouter = (dependencies: IDependenciesData) => {
    const router = express.Router();

    const otpController = otpControllers(dependencies);

	
    router.post("/sendOtp", otpController.sendOtpNodemailerController);

    router.post(
        "/verify-forgotPassword-otp",
        otpController.verifyOtpNodemailerController
    );

    return router;
};
