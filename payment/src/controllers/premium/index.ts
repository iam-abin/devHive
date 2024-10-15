
import getAllPremiumPlansByCandidateController from "./get-all-premium-plans-by-candidate-controller";

import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	return {
		getAllPremiumPlansByCandidateController: getAllPremiumPlansByCandidateController(dependencies),
	};
};
