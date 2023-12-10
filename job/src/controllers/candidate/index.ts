import applyJobController from "./apply-job.controller";
import appliedJobsController from "./applied-jobs.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
		applyJobController: applyJobController(dependencies),
		appliedJobsController: appliedJobsController(dependencies)
	};
};
