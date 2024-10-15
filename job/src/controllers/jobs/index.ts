import filterJobsController from "./filter-jobs.controller";
import viewAllJobsController from "./view-all-jobs.controller";
import viewJobByJobIdController from "./getAJob.controller";
import viewAllJobFieldsDistinctValuesController from "./view-all-job-fields-distinct-values.controller";
import searchJobsController from "./search-jobs.controller"

import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	return {
		filterJobsController: filterJobsController(dependencies),
		viewAllJobsController: viewAllJobsController(dependencies),
		viewAllJobFieldsDistinctValuesController: viewAllJobFieldsDistinctValuesController(dependencies),
		viewJobByJobIdController: viewJobByJobIdController(dependencies),
		searchJobsController: searchJobsController(dependencies),

	};
};
