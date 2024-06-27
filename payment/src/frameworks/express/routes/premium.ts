import express from "express";

import { premiumControllers } from "../../../controllers";
import { IDependenciesData } from "../../types/dependencyInterface";
import {
	currentUserCandidateCheck,
	requireAuthCandidate,
} from "@abijobportal/common";

export const premiumRouter = (dependencies: IDependenciesData) => {
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
