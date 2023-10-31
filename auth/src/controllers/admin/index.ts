import adminSigninController from "./signin.controller";
import adminSignoutController from "./signout.controller";

export = (dependencies: any) => {
	return {
		adminSigninController: adminSigninController(dependencies),
		adminSignoutController: adminSignoutController(dependencies)
	};
};
