import applyJobController from "./applyJob.controller";
import appliedJobsController from "./appliedJobs.controller";
import viewPliedJobApplicationController from "./viewApplication.controller";

import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	return {
		applyJobController: applyJobController(dependencies),
		appliedJobsController: appliedJobsController(dependencies),
		viewPliedJobApplicationController: viewPliedJobApplicationController(dependencies),
	};
};
