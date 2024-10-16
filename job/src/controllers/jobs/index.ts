import filterJobsController from "./filterJobs.controller";
import viewAllJobsController from "./viewJobs.controller";
import viewJobByJobIdController from "./viewJob.controller";
import viewAllJobFieldsDistinctValuesController from "./viewDistinctFieldValues.controller";
import searchJobsController from "./searchJobs.controller"

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
