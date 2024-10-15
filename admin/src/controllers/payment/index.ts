import { IDependency } from "../../frameworks/types/dependencyInterface";

import getAllPaymentsController from "./get-all-payments.controller";

export = (dependencies: IDependency) => {
	return {
		getAllPaymentsController: getAllPaymentsController(dependencies),
	};
};
