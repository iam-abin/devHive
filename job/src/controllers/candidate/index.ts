import applyJobController from "./apply.controller";
import appliedJobsController from "./appliedJobs.controller";
import viewPliedJobApplicationController from "./getApplication.controller";

import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	return {
		applyJobController: applyJobController(dependencies),
		appliedJobsController: appliedJobsController(dependencies),
		viewPliedJobApplicationController: viewPliedJobApplicationController(dependencies),
	};
};
