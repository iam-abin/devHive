import express from "express";

import { paymentControllers } from "../../../controllers";
import { IDependenciesData } from "../../types/dependencyInterface";
import {
	currentUserCandidateCheck,
} from "@abijobportal/common";
import { requireAuthAdmin, requireAuthCandidate } from "@abijobportal/common";

export const paymentRouter = (dependencies: IDependenciesData) => {
	const router = express.Router();

	const {
		cratePaymentController,
	} = paymentControllers(dependencies);
	
	router.post("/create-payment", currentUserCandidateCheck, requireAuthCandidate, cratePaymentController);
	
	return router;
};
