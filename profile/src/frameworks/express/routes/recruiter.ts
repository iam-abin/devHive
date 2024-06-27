import express from "express"

import { recruiterProfileControllers, candidateProfileControllers } from "../../../controllers";

import { IDependenciesData } from "../../types/dependencyInterface";
import { requireAuthRecruiter } from "@abijobportal/common";

export const recruiterRouter = (dependencies: IDependenciesData)=>{
    const router = express.Router();

    const {  viewRecruiterProfileController, updateRecruiterProfileController, viewAllCandidatesProfilesController } = recruiterProfileControllers(dependencies)
    const { viewCandidateProfileController} = candidateProfileControllers(dependencies);

    // recruiter
	router.use(requireAuthRecruiter)

	// router.post("/createProfile", createRecruiterProfileController);
	router.get("/viewProfile/:id", viewRecruiterProfileController);
	router.patch("/updateProfile", updateRecruiterProfileController);
    router.put("/uploadProfilePic", updateRecruiterProfileController);
	router.get("/viewCandidateProfile/:userId",viewCandidateProfileController);
	router.get("/viewAllCandidatesProfiles/:page",viewAllCandidatesProfilesController);

    return router
}