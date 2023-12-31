import recruiterSignupController from "./signup.controller";
import recruiterSigninController from "./signin.controller";
import recruiterSignoutController from "./signout.controller";
import recruiterSignupEmailOtpVerificationController from "./signup-email-otp-verification.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
		recruiterSignupController: recruiterSignupController(dependencies),
		recruiterSigninController: recruiterSigninController(dependencies),
		recruiterSignoutController: recruiterSignoutController(dependencies),
		recruiterSignupEmailOtpVerificationController: recruiterSignupEmailOtpVerificationController(dependencies),
	};
};
