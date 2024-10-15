import express, { Router } from "express";

import { candidateProfileControllers } from "../../../controllers";
import { IDependency } from "../../types/dependencyInterface";
import {  auth, ROLES } from "@abijobportal/common";
import { multerConfig } from "../../../config/multer";

export const candidateRouter = (dependencies: IDependency) => {
	const router: Router = express.Router();

	const profileController = candidateProfileControllers(dependencies);

	
	
	// candidate authentication
	router.use(auth(ROLES.CANDIDATE));

	// candidate
	// router.post("/createProfile", createCandidateProfileController);
	router.get("/viewProfile/:userId", profileController.viewCandidateProfileController);
	router.patch("/updateProfile", profileController.updateCandidateProfileController);
	router.patch("/updateSkills", profileController.updateSkillsController);
	router.patch("/updatePreferredJobs", profileController.updatePreferredJobsController);

	router.put(
		"/uploadProfilePic",
		multerConfig.single("file"),
		profileController.uploadCandidateProfilePicController
	);
	router.put(
		"/uploadResume",
		multerConfig.single("file"),
		profileController.uploadResumeController
	);
	router.patch("/delete-resume/:userId", profileController.deleteResumeController);
	router.get(
		"/viewRecruiterProfile/:id",
		profileController.viewRecruiterProfileByCandidateController
	);

	return router;
};
