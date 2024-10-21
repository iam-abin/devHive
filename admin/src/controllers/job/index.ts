import { IDependency } from "../../frameworks/types/dependency";

import blockUnblockJobController from "./blockUnblock.controller";
import viewJobController from "./viewJob.controller";
import viewJobsController from "./viewJobs.controller";

export = (dependencies: IDependency) => {
	return {
		blockUnblockJobController: blockUnblockJobController(dependencies),
		viewJobController: viewJobController(dependencies),
		viewJobsController: viewJobsController(dependencies),

	};
};
