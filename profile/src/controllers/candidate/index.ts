import viewCandidateProfileController from "./view-profile.controller";
import createCandidateProfileController from "./create-profile.controller";
import updateCandidateProfileController from "./update-profile.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{
    return {
        viewCandidateProfileController: viewCandidateProfileController(dependencies),
        createCandidateProfileController: createCandidateProfileController(dependencies),
        updateCandidateProfileController: updateCandidateProfileController(dependencies)
    }
}