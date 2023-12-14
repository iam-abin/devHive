import getAllCandidatesController from "./view-candidates.controller";
import getCandidateByIdController from "./view-profile.controller";
import candidateBlockUnblockController from "./block-unblock-candidate.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
		getAllCandidatesController: getAllCandidatesController(dependencies),
		getCandidateByIdController: getCandidateByIdController(dependencies),
		candidateBlockUnblockController: candidateBlockUnblockController(dependencies),
		
	};
};
