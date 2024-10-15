import getAllCandidatesController from "./view-candidates.controller";
import getCandidateByIdController from "./view-profile.controller";
import candidateBlockUnblockController from "./block-unblock-candidate.controller";

import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	return {
		getAllCandidatesController: getAllCandidatesController(dependencies),
		getCandidateByIdController: getCandidateByIdController(dependencies),
		candidateBlockUnblockController: candidateBlockUnblockController(dependencies),
		
	};
};
