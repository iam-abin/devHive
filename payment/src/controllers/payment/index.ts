import getAllChatRoomsByUserIDController from "./get-all-payments.controller";
import cratePaymentController from "./create-payment.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
		// getAllChatRoomsByUserIDController: getAllChatRoomsByUserIDController(dependencies),
		cratePaymentController: cratePaymentController(dependencies),
	};
};
