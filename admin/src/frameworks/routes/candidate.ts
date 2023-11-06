import express from "express";

import { candidateControllers } from "../../controllers";
import { DependenciesData } from "../types/dependencyInterface";

export const candidateRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const {
		getAllCandidatesController,
		getCandidateByIdController,
		candidateBlockUnblockController,
	} = candidateControllers(dependencies);

	// candidate
	router.get("/candidates", getAllCandidatesController);
	router.get("/viewProfile", getCandidateByIdController);
	router.put("/blockUnblock/:id", candidateBlockUnblockController);

	return router;
};
