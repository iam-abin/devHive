import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

import adminSigninController from "./signin.controller";
import adminSignoutController from "./signout.controller";

export = (dependencies: IDependenciesData) => {
	return {
		adminSigninController: adminSigninController(dependencies),
		adminSignoutController: adminSignoutController(dependencies),
	};
};
