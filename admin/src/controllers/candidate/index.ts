import getAllCandidatesController from "./view-candidates.controller";
import getCandidateByIdController from "./view-profile.controller";
import candidateBlockUnblockController from "./block-unblock-candidate.controller";

import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	return {
		getAllCandidatesController: getAllCandidatesController(dependencies),
		getCandidateByIdController: getCandidateByIdController(dependencies),
		candidateBlockUnblockController: candidateBlockUnblockController(dependencies),
		
	};
};
