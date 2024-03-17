import createJobController from "./create-job.controller";
import deleteJobController from "./delete-job.controller";
import updateJobController from "./update-job.controller";
import createdJobsByRecruiterController from "./created-jobs-by-recruiter.controller";
import viewJobApplicationsController from "./view-job-applications.controller";
import viewJobApplicationController from "./view-job-application.controller";
import changeJobApplicationStatusController from "./change-job-application-status.controller";
import changeJobCloseStatusController from "./change-job-close-status.controller";
import recruiterDashboardCardsController from "./recruiter-dashboard-cards.controller";
import recruiterDashboardGraphController from "./recruiter-dashboard-graph.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
		createJobController: createJobController(dependencies),
		deleteJobController: deleteJobController(dependencies),
		updateJobController: updateJobController(dependencies),
		createdJobsByRecruiterController: createdJobsByRecruiterController(dependencies),
		viewJobApplicationsController: viewJobApplicationsController(dependencies),
		viewJobApplicationController: viewJobApplicationController(dependencies),
		changeJobApplicationStatusController: changeJobApplicationStatusController(dependencies),
		changeJobCloseStatusController: changeJobCloseStatusController(dependencies),
		recruiterDashboardCardsController: recruiterDashboardCardsController(dependencies),
		recruiterDashboardGraphController: recruiterDashboardGraphController(dependencies),

	};
};
