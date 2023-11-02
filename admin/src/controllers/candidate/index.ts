import { DependenciesData } from "../../frameworks/types/dependencyInterface";

import candidateBlockUnblockController from "./block-unblock.controller";
// import adminSignoutController from "./signout.controller";

export = (dependencies: DependenciesData) => {
	return {
		candidateBlockUnblockController: candidateBlockUnblockController(dependencies),
		// adminSignoutController: adminSignoutController(dependencies)
	};
};
