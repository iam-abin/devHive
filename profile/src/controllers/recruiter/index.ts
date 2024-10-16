import viewCompanyProfileController from "./view-company-profile.controller";
import viewRecruiterProfileController from "./view-profile.controller";
import updateRecruiterProfileController from "./update-profile.controller";
import uploadRecruiterProfilePicController from "./upload-profile-pic.controller";
import viewAllCandidatesProfilesController from "./view-all-candidates-profiles-controller";


import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency)=>{
    return {
        viewRecruiterProfileController: viewRecruiterProfileController(dependencies),
        viewCompanyProfileController: viewCompanyProfileController(dependencies),
        updateRecruiterProfileController: updateRecruiterProfileController(dependencies),
        uploadRecruiterProfilePicController: uploadRecruiterProfilePicController(dependencies),
        viewAllCandidatesProfilesController: viewAllCandidatesProfilesController(dependencies),
    }
}