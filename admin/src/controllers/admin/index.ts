import { IDependency } from "../../frameworks/types/dependencyInterface";

import dashboardController from "./dashboard.controller";
import getDashboardGraphDetailsController from "./get-dashboard-graph-details.controller";

export = (dependencies: IDependency) => {
	return {
		dashboardController: dashboardController(dependencies),
		getDashboardGraphDetailsController: getDashboardGraphDetailsController(dependencies),
	};
};
