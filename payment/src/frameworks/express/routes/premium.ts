import express from "express";

import { premiumControllers } from "../../../controllers";
import { DependenciesData } from "../../types/dependencyInterface";
import {
	currentUserCandidateCheck,
	requireAuthCandidate,
} from "@abijobportal/common";

export const premiumRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const { getAllPremiumPlansByCandidateController, } = premiumControllers(dependencies);
	
	router.get(
		"/get-all-premium-plans-candidate",
		currentUserCandidateCheck,
		requireAuthCandidate,
		getAllPremiumPlansByCandidateController  
	);


	return router;
};
