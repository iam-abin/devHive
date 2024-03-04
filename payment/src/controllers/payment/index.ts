import cratePaymentController from "./create-payment.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
		cratePaymentController: cratePaymentController(dependencies),
	};
};
