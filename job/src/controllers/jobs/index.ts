import filterJobsController from "./filter-jobs.controller";
import viewAllJobsController from "./view-all-jobs.controller";
import viewJobByJobIdController from "./view-job-by-jobid.controller";
import viewAllJobFieldsDistinctValuesController from "./view-all-job-fields-distinct-values.controller";
import searchJobsController from "./search-jobs.controller"

import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	return {
		filterJobsController: filterJobsController(dependencies),
		viewAllJobsController: viewAllJobsController(dependencies),
		viewAllJobFieldsDistinctValuesController: viewAllJobFieldsDistinctValuesController(dependencies),
		viewJobByJobIdController: viewJobByJobIdController(dependencies),
		searchJobsController: searchJobsController(dependencies),

	};
};
