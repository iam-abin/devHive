import { DependenciesData } from "../../frameworks/types/dependencyInterface";

import viewAllPaymentsController from "./view-all-payments.controller";

export = (dependencies: DependenciesData) => {
	return {
		viewAllPaymentsController: viewAllPaymentsController(dependencies),
	};
};
