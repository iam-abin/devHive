import signupController from './signup.controller';
import signinController from './signin.controller';
import signoutController from './signout.controller';
import signupEmailOtpVerificationController from './signupEmailOtpVerification.controller';

import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    return {
        signup: signupController(dependencies),
        signin: signinController(dependencies),
        signout: signoutController(),
        signupEmailOtpVerification: signupEmailOtpVerificationController(dependencies),
    };
};
