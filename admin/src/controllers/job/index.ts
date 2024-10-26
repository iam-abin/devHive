import { IDependency } from "../../frameworks/types/dependency";

import blockUnblockJobController from "./blockUnblock.controller";
import viewJobController from "./getJob.controller";
import viewJobsController from "./getJobs.controller";

export = (dependencies: IDependency) => {
	return {
		blockUnblockJobController: blockUnblockJobController(dependencies),
		viewJobController: viewJobController(dependencies),
		viewJobsController: viewJobsController(dependencies),

	};
};
