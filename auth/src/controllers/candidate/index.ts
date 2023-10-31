import candidateSignupController from "./signup.controller";
import candidateSigninController from "./signin.controller"
import candidateSignoutController from "./signout.controller"
import candidateUpdatePasswordController from "./update-password.controller"

export = (dependencies: any) => {
	return {
        candidateSignupController: candidateSignupController(dependencies),
        candidateSigninController: candidateSigninController(dependencies),
        candidateSignoutController: candidateSignoutController(dependencies),
        candidateUpdatePasswordController:candidateUpdatePasswordController(dependencies)
    }
};
