import createJobController from "./createJob.controller";
import deleteJobController from "./deleteJob.controller";
import updateJobController from "./updateJob.controller";
import createdJobsByRecruiterController from "./viewCreatedJobs.controller";
import viewJobApplicationsController from "./viewApplications.controller";
import viewJobApplicationController from "./viewApplication.controller";
import changeJobApplicationStatusController from "./changeApplicationStatus.controller";
import changeJobCloseStatusController from "./closeJob.controller";
import recruiterDashboardCardsController from "./dashboardCardsData.controller";
import recruiterDashboardGraphController from "./dashboardGraphData.controller";

import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
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
