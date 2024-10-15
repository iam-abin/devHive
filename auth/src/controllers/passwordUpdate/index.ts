import updatePasswordController from "../passwordUpdate/update-password.controller";

import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	return {
        updatePasswordController: updatePasswordController(dependencies),
	};
};