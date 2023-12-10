import createJobController from "./create-job.controller";
import deleteJobController from "./delete-job.controller";
import updateJobController from "./update-job.controller";
import createdJobsByRecruiterController from "./created-jobs-by-recruiter.controller";
import viewJobApplicationsController from "./view-job-applications.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
		createJobController: createJobController(dependencies),
		deleteJobController: deleteJobController(dependencies),
		updateJobController: updateJobController(dependencies),
		createdJobsByRecruiterController: createdJobsByRecruiterController(dependencies),
		viewJobApplicationsController: viewJobApplicationsController(dependencies),

	};
};
