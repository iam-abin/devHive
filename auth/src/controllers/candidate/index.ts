import candidateSignupController from './signup.controller';
import candidateSigninController from './signin.controller';
import candidateSignoutController from './signout.controller';
import candidateSignupEmailOtpVerificationController from './signupEmailOtpVerification.controller';

import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    return {
        candidateSignupController: candidateSignupController(dependencies),
        candidateSigninController: candidateSigninController(dependencies),
        candidateSignoutController: candidateSignoutController(),
        candidateSignupEmailOtpVerificationController:
            candidateSignupEmailOtpVerificationController(dependencies),
    };
};
