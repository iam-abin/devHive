import { DependenciesData } from "../../frameworks/types/dependencyInterface";

import dashboardController from "./dashboard.controller";

export = (dependencies: DependenciesData) => {
	return {
		dashboardController: dashboardController(dependencies),
	};
};
