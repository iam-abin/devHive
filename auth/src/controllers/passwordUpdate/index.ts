import updatePasswordController from "../passwordUpdate/update-password.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
        updatePasswordController: updatePasswordController(dependencies),
	};
};