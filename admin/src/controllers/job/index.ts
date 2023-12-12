import { DependenciesData } from "../../frameworks/types/dependencyInterface";

import blockUnblockJobController from "./block-unblock-job.controller";
import viewJobController from "./view-job.controller";
import viewJobsController from "./view-jobs.controller";

export = (dependencies: DependenciesData) => {
	return {
		blockUnblockJobController: blockUnblockJobController(dependencies),
		viewJobController: viewJobController(dependencies),
		viewJobsController: viewJobsController(dependencies),

	};
};
