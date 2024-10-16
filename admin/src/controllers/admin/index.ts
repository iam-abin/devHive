import { IDependency } from "../../frameworks/types/dependencyInterface";

import dashboardController from "./dashboard.controller";
import getDashboardGraphDetailsController from "./dashboardGraph.controller";

export = (dependencies: IDependency) => {
	return {
		dashboardDataController: dashboardController(dependencies),
		getDashboardGraphDetailsController: getDashboardGraphDetailsController(dependencies),
	};
};
