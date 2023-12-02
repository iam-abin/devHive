import express from "express"

import {recruiterProfileControllers} from "../../controllers";

import { DependenciesData } from "../types/dependencyInterface"

export const recruiterRouter = (dependencies: DependenciesData)=>{
    const router = express.Router();

    const { createRecruiterProfileController, viewRecruiterProfileController, updateRecruiterProfileController, viewCandidateProfileController } = recruiterProfileControllers(dependencies)

    // recruiter
	router.post("/createProfile", createRecruiterProfileController);
	router.get("/viewProfile", viewRecruiterProfileController);
	router.patch("/updateProfile", updateRecruiterProfileController);
    router.put("/uploadProfilePic", updateRecruiterProfileController);
	router.get("/viewCandidateProfile",viewCandidateProfileController);

    return router
}