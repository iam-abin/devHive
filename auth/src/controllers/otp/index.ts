import sendOtpController from './sendotp.controller';
import verifyOtpController from './verifyotp.controller';

import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    return {
        sendOtp: sendOtpController(dependencies),
        verifyOtp: verifyOtpController(dependencies),
    };
};
