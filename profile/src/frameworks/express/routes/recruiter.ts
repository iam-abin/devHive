import express from "express"

import { recruiterProfileControllers, candidateProfileControllers } from "../../../controllers";

import { IDependenciesData } from "../../types/dependencyInterface";
import { auth, ROLES } from "@abijobportal/common";

export const recruiterRouter = (dependencies: IDependenciesData)=>{
    const router = express.Router();

    const {  viewRecruiterProfileController, updateRecruiterProfileController, viewAllCandidatesProfilesController } = recruiterProfileControllers(dependencies)
    const { viewCandidateProfileController} = candidateProfileControllers(dependencies);

    // recruiter
	router.use(auth(ROLES.RECRUITER))

	// router.post("/createProfile", createRecruiterProfileController);
	router.get("/viewProfile/:id", viewRecruiterProfileController);
	router.patch("/updateProfile", updateRecruiterProfileController);
    router.put("/uploadProfilePic", updateRecruiterProfileController);
	router.get("/viewCandidateProfile/:userId",viewCandidateProfileController);
	router.get("/viewAllCandidatesProfiles/:page",viewAllCandidatesProfilesController);

    return router
}