import filterJobsController from "./filter-jobs.controller";
import viewAllJobsController from "./view-all-jobs.controller";
import viewJobByJobIdController from "./view-job-by-jobid.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
		filterJobsController: filterJobsController(dependencies),
		viewAllJobsController: viewAllJobsController(dependencies),
		viewJobByJobIdController: viewJobByJobIdController(dependencies),

	};
};
