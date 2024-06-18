import updatePasswordController from "../passwordUpdate/update-password.controller";

import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	return {
        updatePasswordController: updatePasswordController(dependencies),
	};
};