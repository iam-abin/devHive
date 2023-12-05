import createJobController from "./create-job.controller";
import deleteJobController from "./delete-job.controller";
import updateJobController from "./update-job.controller";
import filterJobRecruiterController from "./filter-job-recruiter.controller";
import viewAllJobsRecruiterController from "./view-all-jobs-recruiter.controller";
import viewJobRecruiterController from "./view-job-recruiter.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
		createJobController: createJobController(dependencies),
		deleteJobController: deleteJobController(dependencies),
		updateJobController: updateJobController(dependencies),
		filterJobRecruiterController: filterJobRecruiterController(dependencies),
		viewAllJobsRecruiterController: viewAllJobsRecruiterController(dependencies),
		viewJobRecruiterController: viewJobRecruiterController(dependencies),

	};
};
