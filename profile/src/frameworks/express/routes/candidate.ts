import express from "express"

import { candidateProfileControllers } from "../../../controllers";
import { DependenciesData } from "../../types/dependencyInterface";
import { requireAuthCandidate } from "@abijobportal/common";
import { multerConfig } from "../../../config/multer";

export const candidateRouter = (dependencies: DependenciesData)=>{
    const router = express.Router();

    const { viewCandidateProfileController, updateCandidateProfileController, uploadResumeController } = candidateProfileControllers(dependencies);

    // candidate authentication
	router.use(requireAuthCandidate)

	// candidate
	// router.post("/createProfile", createCandidateProfileController);
	router.get("/viewProfile/:userId", viewCandidateProfileController);
	router.patch("/updateProfile", updateCandidateProfileController);
	router.put("/uploadProfilePic",multerConfig.single('file'), updateCandidateProfileController);
	router.put("/uploadResume",multerConfig.single('file'), uploadResumeController);
	// router.put("/uploadResume", uploadResumeController);

    return router
}