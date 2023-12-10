import viewCandidateProfileController from "./view-profile.controller";
import createCandidateProfileController from "./create-profile.controller";
import updateCandidateProfileController from "./update-profile.controller";
import uploadCandidateProfilePicController from "./upload-profile-pic.controller";
import uploadResumeController from "./upload-resume.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{
    return {
        viewCandidateProfileController: viewCandidateProfileController(dependencies),
        createCandidateProfileController: createCandidateProfileController(dependencies),
        updateCandidateProfileController: updateCandidateProfileController(dependencies),
        uploadCandidateProfilePicController: uploadCandidateProfilePicController(dependencies),
        uploadResumeController: uploadResumeController(dependencies),

    }
}