import { IDependency } from "../../frameworks/types/dependencyInterface";

import getAllPaymentsController from "./getPayments.controller";

export = (dependencies: IDependency) => {
	return {
		getAllPaymentsController: getAllPaymentsController(dependencies),
	};
};
