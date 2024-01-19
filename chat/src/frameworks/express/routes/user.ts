import express from "express";


import { userControllers } from "../../../controllers";
import { DependenciesData } from "../../types/dependencyInterface";
import { requireAuthAdmin } from "@abijobportal/common";

export const userRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const {
		searchUserController,
	} = userControllers(dependencies);

	router.get("/search-user", searchUserController);
	// router.get("/viewProfile/:userId", requireAuthAdmin, getCandidateByIdController);
	// router.put("/blockUnblock/:userId", requireAuthAdmin, candidateBlockUnblockController);

	return router;
};
