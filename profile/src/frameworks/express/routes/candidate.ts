import express from "express";

import { candidateProfileControllers } from "../../../controllers";
import { DependenciesData } from "../../types/dependencyInterface";
import { requireAuthCandidate } from "@abijobportal/common";
import { multerConfig } from "../../../config/multer";

export const candidateRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const {
		viewCandidateProfileController,
		updateCandidateProfileController,
		uploadResumeController,
		uploadCandidateProfilePicController,
		viewRecruiterProfileByCandidateController,
	} = candidateProfileControllers(dependencies);

	// candidate authentication
	router.use(requireAuthCandidate);

	// candidate
	// router.post("/createProfile", createCandidateProfileController);
	router.get("/viewProfile/:userId", viewCandidateProfileController);
	router.patch("/updateProfile", updateCandidateProfileController);
	router.put(
		"/uploadProfilePic",
		multerConfig.single("file"),
		uploadCandidateProfilePicController
	);
	router.put(
		"/uploadResume",
		multerConfig.single("file"),
		uploadResumeController
	);
	router.get("/viewRecruiterProfile/:id", viewRecruiterProfileByCandidateController);

	return router;
};
