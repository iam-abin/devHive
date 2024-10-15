import express from "express";

import { auth, ROLES } from "@abijobportal/common";
import {
    otpControllers,
    passwordControllers,
    recruiterControllers,
} from "../../../controllers";
import { signupRequestBodyValidatorMiddlewares } from "../../middlewares/signupValidation";
import { signinRequestBodyValidatorMiddlewares } from "../../middlewares/signinValidation";
import { IDependency } from "../../types/dependencyInterface";

export const recruiterRouter = (dependencies: IDependency) => {
    const router = express.Router();

    const recruiterController = recruiterControllers(dependencies);
    const otpController = otpControllers(dependencies);
    const passwordController = passwordControllers(dependencies);


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
