import express from "express";

import { auth, ROLES } from "@abijobportal/common";
import {
    otpControllers,
    passwordUpdateControllers,
    recruiterControllers,
} from "../../../controllers";
import { signupRequestBodyValidatorMiddlewares } from "../../middlewares/signupValidation";
import { signinRequestBodyValidatorMiddlewares } from "../../middlewares/signinValidation";
import { IDependenciesData } from "../../types/dependencyInterface";

export const recruiterRouter = (dependencies: IDependenciesData) => {
    const router = express.Router();

    const recruiterController = recruiterControllers(dependencies);
    const otpController = otpControllers(dependencies);
    const passwordController = passwordUpdateControllers(dependencies);


    router.post(
        "/signup",
        signupRequestBodyValidatorMiddlewares,
        recruiterController.recruiterSignupController
    );

    router.post(
        "/verifyEmail",
        recruiterController.recruiterSignupEmailOtpVerificationController
    );

    router.post(
        "/signin",
        signinRequestBodyValidatorMiddlewares,
        recruiterController.recruiterSigninController
    );

    router.put("/forgotPassword", passwordController.updatePasswordController);

    router.post(
        "/sendOtp",
        auth(ROLES.RECRUITER),
        otpController.sendOtpTwilioController
    );

    router.post(
        "/verifyOtp",
        auth(ROLES.RECRUITER),
        otpController.verifyOtpTwilioController
    );

    router.put(
        "/resetPassword",
        auth(ROLES.RECRUITER),
        passwordController.updatePasswordController
    );

    router.post("/signout", recruiterController.recruiterSignoutController);

    return router;
};
