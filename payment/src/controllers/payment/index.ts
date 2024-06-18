import cratePaymentController from "./create-payment.controller";

import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	return {
		cratePaymentController: cratePaymentController(dependencies),
	};
};
