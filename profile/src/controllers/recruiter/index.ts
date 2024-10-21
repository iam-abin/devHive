import viewRecruiterProfileController from "./viewProfile.controller";
import updateRecruiterProfileController from "./update.controller";
import viewAllCandidatesProfilesController from "./getcandidates.controller";


import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency)=>{
    return {
        viewRecruiterProfileController: viewRecruiterProfileController(dependencies),
        updateRecruiterProfileController: updateRecruiterProfileController(dependencies),
        viewAllCandidatesProfilesController: viewAllCandidatesProfilesController(dependencies),
    }
}