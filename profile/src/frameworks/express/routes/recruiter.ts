import express from "express";

import {
    recruiterProfileControllers,
    candidateProfileControllers,
} from "../../../controllers";

import { IDependency } from "../../types/dependency";
import { auth, ROLES } from "@abijobportal/common";

export const recruiterRouter = (dependencies: IDependency) => {
    const router = express.Router();

    const recruiterProfileController = recruiterProfileControllers(dependencies);
    const candidateProfileController = candidateProfileControllers(dependencies);

    // recruiter
    router.use(auth(ROLES.RECRUITER));

    router.get("/viewProfile/:id", recruiterProfileController.viewRecruiterProfileController);
    router.patch("/updateProfile", recruiterProfileController.updateRecruiterProfileController);
    router.put("/uploadProfilePic", recruiterProfileController.updateRecruiterProfileController);
    router.get("/candidate/Profile/:userId", candidateProfileController.viewCandidateProfileController);
    router.get(
        "/viewAllCandidatesProfiles/:page",
        recruiterProfileController.viewAllCandidatesProfilesController
    );

    return router;
};
