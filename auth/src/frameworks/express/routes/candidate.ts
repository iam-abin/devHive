import express from "express";
import { auth, ROLES } from "@abijobportal/common";

import {
    candidateControllers,
    otpControllers,
    passwordControllers,
} from "../../../controllers";
import { signupRequestBodyValidatorMiddlewares } from "../../middlewares/signupValidation";
import { signinRequestBodyValidatorMiddlewares } from "../../middlewares/signinValidation";
import { IDependency } from "../../types/dependencyInterface";

export const candidateRouter = (dependencies: IDependency) => {
    const router = express.Router();

    const adminControlle = candidateControllers(dependencies);
    const otpController = otpControllers(dependencies);
    const passwordController = passwordControllers(dependencies);

    router.post(
        "/signup",
        signupRequestBodyValidatorMiddlewares,
        adminControlle.candidateSignupController
    );

    router.post(
        "/verifyEmail",
        adminControlle.candidateSignupEmailOtpVerificationController
    );

    router.post(
        "/signin",
        signinRequestBodyValidatorMiddlewares,
        adminControlle.candidateSigninController
    );

    router.put("/forgotPassword", passwordController.updatePasswordController);

    router.post(
        "/sendOtp",
        auth(ROLES.CANDIDATE),
        otpController.sendOtpTwilioController
    );

    router.post(
        "/verifyOtp",
        auth(ROLES.CANDIDATE),
        otpController.verifyOtpTwilioController
    );

    router.put(
        "/resetPassword",
        auth(ROLES.CANDIDATE),
        passwordController.updatePasswordController
    );

    router.post(
        "/signout",
        auth(ROLES.CANDIDATE),
        adminControlle.candidateSignoutController
    );

    return router;
};
