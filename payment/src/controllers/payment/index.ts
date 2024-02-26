import cratePaymentController from "./create-payment.controller";
import getAllPaymentsController from "./get-all-payments.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
		getAllPaymentsController: getAllPaymentsController(dependencies),
		cratePaymentController: cratePaymentController(dependencies),
	};
};
