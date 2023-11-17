import recruiterSignupController from "./signup.controller";
import recruiterSigninController from "./signin.controller";
import recruiterSignoutController from "./signout.controller";
import recruiterUpdatePasswordController from "./update-password.controller";
import recruiterSignupEmailVerifyController from "./signup.email-verification.controller"

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
		recruiterSignupController: recruiterSignupController(dependencies),
		recruiterSigninController: recruiterSigninController(dependencies),
		recruiterSignoutController: recruiterSignoutController(dependencies),
		recruiterUpdatePasswordController: recruiterUpdatePasswordController(dependencies),
		recruiterSignupEmailVerifyController: recruiterSignupEmailVerifyController(dependencies),
	};
};
