import express from "express";

import { paymentControllers } from "../../../controllers";
import { DependenciesData } from "../../types/dependencyInterface";
import {
	currentUserAdminCheck,
	currentUserCandidateCheck,
} from "@abijobportal/common";
import { requireAuthAdmin, requireAuthCandidate } from "@abijobportal/common";

export const paymentRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const {
		cratePaymentController,
		getAllPaymentsController,
	} = paymentControllers(dependencies);
	
	router.post("/create-payment", currentUserCandidateCheck, requireAuthCandidate, cratePaymentController);

	// router.use(currentUserAdminCheck);
	// router.use(requireAuthAdmin);
	router.post("/get-all-payments", currentUserAdminCheck, requireAuthAdmin, getAllPaymentsController);
	
	return router;
};
