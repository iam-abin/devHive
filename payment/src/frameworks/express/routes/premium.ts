import express from "express";

import { premiumControllers } from "../../../controllers";
import { DependenciesData } from "../../types/dependencyInterface";
import {
	currentUserAdminCheck,
	currentUserCandidateCheck,
	requireAuthAdmin,
	requireAuthCandidate,
} from "@abijobportal/common";

export const premiumRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const {
		// getAllChatRoomsByUserIDController,
		getAllPremiumPlansByCandidateController,
	} = premiumControllers(dependencies);
	
	router.get(
		"/get-all-premium-plans-candidate",
		currentUserCandidateCheck,
		requireAuthCandidate,
		getAllPremiumPlansByCandidateController  
	);

	// router.use(currentUserAdminCheck);
	// router.use(requireAuthAdmin);

	return router;
};
