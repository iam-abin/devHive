import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

import getAllPaymentsController from "./get-all-payments.controller";

export = (dependencies: IDependenciesData) => {
	return {
		getAllPaymentsController: getAllPaymentsController(dependencies),
	};
};
