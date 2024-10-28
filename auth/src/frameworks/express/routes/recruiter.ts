import express from 'express';

import { auth, ROLES } from '@abijobportal/common';
import { otpControllers, passwordControllers, authControllers } from '../../../controllers';
import { signupRequestBodyValidatorMiddlewares } from '../../middlewares/signupValidation';
import { signinRequestBodyValidatorMiddlewares } from '../../middlewares/signinValidation';
import { IDependency } from '../../types/dependency';

export const recruiterRouter = (dependencies: IDependency) => {
    const router = express.Router();

    const authController = authControllers(dependencies);
    const otpController = otpControllers(dependencies);
    const passwordController = passwordControllers(dependencies);

    router.post('/signup', signupRequestBodyValidatorMiddlewares, authController.signup);

    router.post('/verifyEmail', authController.signupEmailOtpVerification);

    router.post('/signin', signinRequestBodyValidatorMiddlewares, authController.signin);

    router.put('/forgotPassword', passwordController.updatePassword);

    router.post('/sendOtp', auth(ROLES.RECRUITER), otpController.sendOtp);

    router.post('/verifyOtp', auth(ROLES.RECRUITER), otpController.verifyOtp);

    router.put('/resetPassword', auth(ROLES.RECRUITER), passwordController.updatePassword);

    router.post('/signout', authController.signout);

    return router;
};
