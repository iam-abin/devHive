import viewCandidateProfileController from "./view-profile.controller";
// import createCandidateProfileController from "./create-profile.controller";
import updateCandidateProfileController from "./update-profile.controller";
import uploadCandidateProfilePicController from "./upload-profile-pic.controller";
import uploadResumeController from "./upload-resume.controller";
import deleteResumeController from "./delete-resume-controller";
import viewRecruiterProfileController from "./view-recruiter-profile.controller";
import updateSkillsController from "./update-skills.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{
    return {
        viewCandidateProfileController: viewCandidateProfileController(dependencies),
        // createCandidateProfileController: createCandidateProfileController(dependencies),
        updateCandidateProfileController: updateCandidateProfileController(dependencies),
        uploadCandidateProfilePicController: uploadCandidateProfilePicController(dependencies),
        uploadResumeController: uploadResumeController(dependencies),
        deleteResumeController: deleteResumeController(dependencies),
        viewRecruiterProfileByCandidateController: viewRecruiterProfileController(dependencies),
        updateSkillsController: updateSkillsController(dependencies),


    }
}