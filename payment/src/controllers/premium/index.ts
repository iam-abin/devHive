
import getAllPremiumPlansByCandidateController from "./get-all-premium-plans-by-candidate-controller";

import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	return {
		getAllPremiumPlansByCandidateController: getAllPremiumPlansByCandidateController(dependencies),
	};
};
