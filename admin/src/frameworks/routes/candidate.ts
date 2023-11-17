import express from "express";


import { candidateControllers } from "../../controllers";
import { DependenciesData } from "../types/dependencyInterface";
import { requireAuthAdmin } from "@abijobportal/common";

export const candidateRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const {
		getAllCandidatesController,
		getCandidateByIdController,
		candidateBlockUnblockController,
	} = candidateControllers(dependencies);

	// candidate authentication
	// router.use(requireAuthCandidate)

	// candidate
	router.get("/candidates", requireAuthAdmin, getAllCandidatesController);
	router.get("/viewProfile", requireAuthAdmin, getCandidateByIdController);
	router.put("/blockUnblock/:id", requireAuthAdmin, candidateBlockUnblockController);

	return router;
};
