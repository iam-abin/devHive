import createJobController from "./createJob.controller";
import deleteJobController from "./deleteJob.controller";
import createdJobsByRecruiterController from "./getCreatedJobs.controller";
import viewJobApplicationsController from "./getApplications.controller";
import viewJobApplicationController from "./getApplication.controller";
import changeJobApplicationStatusController from "./changeApplicationStatus.controller";
import changeJobCloseStatusController from "./closeJob.controller";
import recruiterDashboardCardsController from "./dashboardCardsData.controller";
import recruiterDashboardGraphController from "./dashboardGraphData.controller";
import editJobController from "./edit.controller";

import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	return {
		createJobController: createJobController(dependencies),
		deleteJobController: deleteJobController(dependencies),
		createdJobsByRecruiterController: createdJobsByRecruiterController(dependencies),
		viewJobApplicationsController: viewJobApplicationsController(dependencies),
		viewJobApplicationController: viewJobApplicationController(dependencies),
		changeJobApplicationStatusController: changeJobApplicationStatusController(dependencies),
		changeJobCloseStatusController: changeJobCloseStatusController(dependencies),
		recruiterDashboardCardsController: recruiterDashboardCardsController(dependencies),
		recruiterDashboardGraphController: recruiterDashboardGraphController(dependencies),
		editJobController: editJobController(dependencies)

	};
};
