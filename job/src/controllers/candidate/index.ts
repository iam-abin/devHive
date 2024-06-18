import applyJobController from "./apply-job.controller";
import appliedJobsController from "./applied-jobs.controller";
import viewPliedJobApplicationController from "./view-applied-job-application.controller";

import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	return {
		applyJobController: applyJobController(dependencies),
		appliedJobsController: appliedJobsController(dependencies),
		viewPliedJobApplicationController: viewPliedJobApplicationController(dependencies),
	};
};
