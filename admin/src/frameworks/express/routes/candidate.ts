import express, { Router } from "express";
import { candidateControllers } from "../../../controllers";
import { IDependenciesData } from "../../types/dependencyInterface";

export const candidateRouter = (dependencies: IDependenciesData) => {
	const router: Router = express.Router();

	const {
		getAllCandidatesController,
		getCandidateByIdController,
		candidateBlockUnblockController,
	} = candidateControllers(dependencies);

	// candidate
	router.get("/candidates", getAllCandidatesController);
	router.get("/viewProfile/:userId", getCandidateByIdController);
	router.put("/blockUnblock/:userId", candidateBlockUnblockController);

	return router;
};
