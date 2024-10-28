import recruiterSignupController from './signup.controller';
import recruiterSigninController from './signin.controller';
import recruiterSignoutController from './signout.controller';
import recruiterSignupEmailOtpVerificationController from './signupEmailOtpVerification.controller';

import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    return {
        recruiterSignupController: recruiterSignupController(dependencies),
        recruiterSigninController: recruiterSigninController(dependencies),
        recruiterSignoutController: recruiterSignoutController(),
        recruiterSignupEmailOtpVerificationController:
            recruiterSignupEmailOtpVerificationController(dependencies),
    };
};
