import express from "express";

import { paymentControllers } from "../../../controllers";
import { IDependenciesData } from "../../types/dependencyInterface";
import {
	checkCurrentUser,
	auth,
	ROLES
} from "@abijobportal/common";

export const paymentRouter = (dependencies: IDependenciesData) => {
	const router = express.Router();

	const {
		cratePaymentController,
	} = paymentControllers(dependencies);
	
	router.post("/create-payment", checkCurrentUser, auth(ROLES.CANDIDATE), cratePaymentController);
	
	return router;
};
