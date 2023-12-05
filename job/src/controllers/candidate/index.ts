import applyJobController from "./apply-job.controller";
import filterJobCandidateController from "./filter-job-candidate.controller";
import viewAllJobsCandidateController from "./view-all-jobs-candidate.controller";
import viewJobCandidateController from "./view-job-candidate.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
		applyJobController: applyJobController(dependencies),
		filterJobCandidateController: filterJobCandidateController(dependencies),
		viewAllJobsCandidateController: viewAllJobsCandidateController(dependencies),
		viewJobCandidateController: viewJobCandidateController(dependencies)
	};
};
