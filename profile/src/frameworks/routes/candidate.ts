import express from "express"

import { candidateProfileControllers } from "../../controllers";
import { DependenciesData } from "../types/dependencyInterface"

export const candidateRouter = (dependencies: DependenciesData)=>{
    const router = express.Router();

    const { viewCandidateProfileController, updateCandidateProfileController } = candidateProfileControllers(dependencies);

    // candidate authentication
	// router.use(requireAuthCandidate)

	// candidate
	// router.post("/createProfile", createCandidateProfileController);
	router.get("/viewProfile/:userId", viewCandidateProfileController);
	router.patch("/updateProfile", updateCandidateProfileController);
	router.put("/uploadProfilePic", updateCandidateProfileController);
	router.put("/uploadResume", updateCandidateProfileController);

    return router
}