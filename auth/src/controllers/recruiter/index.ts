import recruiterSignupController from "./signup.controller";
import recruiterSigninController from "./signin.controller";
import recruiterSignoutController from "./signout.controller";
import recruiterUpdatePasswordController from "./update-password.controller";

export = (dependencies: any) => {
	return {
		recruiterSignupController: recruiterSignupController(dependencies),
		recruiterSigninController: recruiterSigninController(dependencies),
		recruiterSignoutController: recruiterSignoutController(dependencies),
		recruiterUpdatePasswordController: recruiterUpdatePasswordController(dependencies),
	};
};
