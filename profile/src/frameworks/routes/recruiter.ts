import express from "express"

import {recruiterProfileControllers, candidateProfileControllers} from "../../controllers";

import { DependenciesData } from "../types/dependencyInterface"

export const recruiterRouter = (dependencies: DependenciesData)=>{
    const router = express.Router();

    const {  viewRecruiterProfileController, updateRecruiterProfileController,  } = recruiterProfileControllers(dependencies)
    const { viewCandidateProfileController} = candidateProfileControllers(dependencies);

    // recruiter
	// router.post("/createProfile", createRecruiterProfileController);
	router.get("/viewProfile/:id", viewRecruiterProfileController);
	router.patch("/updateProfile", updateRecruiterProfileController);
    router.put("/uploadProfilePic", updateRecruiterProfileController);
	router.get("/viewCandidateProfile/:id",viewCandidateProfileController);

    return router
}