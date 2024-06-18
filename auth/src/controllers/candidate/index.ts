import candidateSignupController from "./signup.controller";
import candidateSigninController from "./signin.controller";
import candidateSignoutController from "./signout.controller";
import candidateSignupEmailOtpVerificationController from "./signup-email-otp-verification.controller"

import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	return {
		candidateSignupController: candidateSignupController(dependencies),
		candidateSigninController: candidateSigninController(dependencies),
		candidateSignoutController: candidateSignoutController(dependencies),
		candidateSignupEmailOtpVerificationController: candidateSignupEmailOtpVerificationController(dependencies),
	};
};
