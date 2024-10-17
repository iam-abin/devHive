
import getAllPremiumPlansByCandidateController from "./getPremiumPlans.controller";

import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	return {
		getAllPremiumPlansByCandidateController: getAllPremiumPlansByCandidateController(dependencies),
	};
};
