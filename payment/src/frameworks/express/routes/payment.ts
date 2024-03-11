import express from "express";

import { paymentControllers } from "../../../controllers";
import { DependenciesData } from "../../types/dependencyInterface";
import {
	currentUserCandidateCheck,
} from "@abijobportal/common";
import { requireAuthAdmin, requireAuthCandidate } from "@abijobportal/common";

export const paymentRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const {
		cratePaymentController,
	} = paymentControllers(dependencies);
	
	router.post("/create-payment", currentUserCandidateCheck, requireAuthCandidate, cratePaymentController);

	// router.use(currentUserAdminCheck);
	// router.use(requireAuthAdmin);
	
	
	return router;
};
