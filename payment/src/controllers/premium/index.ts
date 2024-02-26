import createPremiumPlanController from "./create-premium-plan.controller";
import getAllPremiumPlansByAdminController from "./get-all-premium-plans-by-admin-controller";
import getAllPremiumPlansByCandidateController from "./get-all-premium-plans-by-candidate-controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
		createPremiumPlanController: createPremiumPlanController(dependencies),
		getAllPremiumPlansByAdminController: getAllPremiumPlansByAdminController(dependencies),
		getAllPremiumPlansByCandidateController: getAllPremiumPlansByCandidateController(dependencies),
	};
};
