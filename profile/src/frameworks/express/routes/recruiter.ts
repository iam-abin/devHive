import express from "express";

import {
    recruiterProfileControllers,
    candidateProfileControllers,
} from "../../../controllers";

import { IDependenciesData } from "../../types/dependencyInterface";
import { auth, ROLES } from "@abijobportal/common";

export const recruiterRouter = (dependencies: IDependenciesData) => {
    const router = express.Router();

    const recruiterProfileController = recruiterProfileControllers(dependencies);
    const candidateProfileController = candidateProfileControllers(dependencies);

    // recruiter
    router.use(auth(ROLES.RECRUITER));

    router.get("/viewProfile/:id", recruiterProfileController.viewRecruiterProfileController);
    router.patch("/updateProfile", recruiterProfileController.updateRecruiterProfileController);
    router.put("/uploadProfilePic", recruiterProfileController.updateRecruiterProfileController);
    router.get("/viewCandidateProfile/:userId", candidateProfileController.viewCandidateProfileController);
    router.get(
        "/viewAllCandidatesProfiles/:page",
        recruiterProfileController.viewAllCandidatesProfilesController
    );

    return router;
};
