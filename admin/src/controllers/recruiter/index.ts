import getAllRecruitersController from "./view-recruiters.controller";
import getRecruiterByIdController from "./view-recruiter-profile.controller";
import recruiterBlockUnblockController from "./block-unblock-recruiter.controller";

import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	return {
		getAllRecruitersController: getAllRecruitersController(dependencies),
		getRecruiterByIdController: getRecruiterByIdController(dependencies),
		recruiterBlockUnblockController: recruiterBlockUnblockController(dependencies),
		
	};
};
