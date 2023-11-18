import candidateSignupController from "./signup.controller";
import candidateSigninController from "./signin.controller";
import candidateSignoutController from "./signout.controller";
import candidateUpdatePasswordController from "./update-password.controller";
import candidateSignupEmailVerifyController from "./signup.email-verification.controller"
import candidateSendOtpController from "./send-otp.controller"
import candidateVerifyOtpController from "./verify-otp.controller"

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
		candidateSignupController: candidateSignupController(dependencies),
		candidateSigninController: candidateSigninController(dependencies),
		candidateSignoutController: candidateSignoutController(dependencies),
		candidateUpdatePasswordController: candidateUpdatePasswordController(dependencies),
		candidateSignupEmailVerifyController: candidateSignupEmailVerifyController(dependencies),
		candidateSendOtpController: candidateSendOtpController(dependencies),
		candidateVerifyOtpController: candidateVerifyOtpController(dependencies)
	};
};
