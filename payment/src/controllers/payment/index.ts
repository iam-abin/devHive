import cratePaymentController from "./create-payment.controller";

import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	return {
		cratePaymentController: cratePaymentController(dependencies),
	};
};
