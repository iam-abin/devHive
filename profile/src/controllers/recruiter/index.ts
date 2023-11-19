import viewRecruiterProfileController from "./view-profile.controller";
import viewCandidateProfileController from "./view-candidate-profile.controller";
import createRecruiterProfileController from "./create-profile.controller";
import updateRecruiterProfileController from "./update-profile.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{
    return {
        viewRecruiterProfileController: viewRecruiterProfileController(dependencies),
        viewCandidateProfileController: viewCandidateProfileController(dependencies),
        createRecruiterProfileController: createRecruiterProfileController(dependencies),
        updateRecruiterProfileController: updateRecruiterProfileController(dependencies)
    }
}