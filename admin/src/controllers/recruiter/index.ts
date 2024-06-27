import getAllRecruitersController from "./view-recruiters.controller";
import getRecruiterByIdController from "./view-recruiter-profile.controller";
import recruiterBlockUnblockController from "./block-unblock-recruiter.controller";

import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	return {
		getAllRecruitersController: getAllRecruitersController(dependencies),
		getRecruiterByIdController: getRecruiterByIdController(dependencies),
		recruiterBlockUnblockController: recruiterBlockUnblockController(dependencies),
		
	};
};
