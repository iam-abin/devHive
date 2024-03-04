import { DependenciesData } from "../../frameworks/types/dependencyInterface";

import getAllPaymentsController from "./get-all-payments.controller";

export = (dependencies: DependenciesData) => {
	return {
		getAllPaymentsController: getAllPaymentsController(dependencies),
	};
};
