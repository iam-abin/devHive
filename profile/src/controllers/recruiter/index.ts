import viewCompanyProfileController from "./view-company-profile.controller";
import viewRecruiterProfileController from "./view-profile.controller";
import updateCompanyProfileController from "./update-company-profile.controller";
import updateRecruiterProfileController from "./update-profile.controller";
import uploadRecruiterProfilePicController from "./upload-profile-pic.controller";
import viewAllCandidatesProfilesController from "./view-all-candidates-profiles-controller";


import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData)=>{
    return {
        viewRecruiterProfileController: viewRecruiterProfileController(dependencies),
        viewCompanyProfileController: viewCompanyProfileController(dependencies),
        updateRecruiterProfileController: updateRecruiterProfileController(dependencies),
        updateCompanyProfileController: updateCompanyProfileController(dependencies),
        uploadRecruiterProfilePicController: uploadRecruiterProfilePicController(dependencies),
        viewAllCandidatesProfilesController: viewAllCandidatesProfilesController(dependencies),
    }
}