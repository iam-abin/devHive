
import getAllPremiumPlansByCandidateController from "./get-all-premium-plans-by-candidate-controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
		getAllPremiumPlansByCandidateController: getAllPremiumPlansByCandidateController(dependencies),
	};
};
