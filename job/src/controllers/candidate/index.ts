import applyJobController from "./apply-job.controller";
import appliedJobsController from "./applied-jobs.controller";
import viewPliedJobApplicationController from "./view-applied-job-application.controller";

import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	return {
		applyJobController: applyJobController(dependencies),
		appliedJobsController: appliedJobsController(dependencies),
		viewPliedJobApplicationController: viewPliedJobApplicationController(dependencies),
	};
};
