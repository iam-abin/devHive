import getAllRecruitersController from "./view-recruiters.controller";
import getRecruiterByIdController from "./view-recruiter-profile.controller";
import recruiterBlockUnblockController from "./block-unblock-recruiter.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
		getAllRecruitersController: getAllRecruitersController(dependencies),
		getRecruiterByIdController: getRecruiterByIdController(dependencies),
		recruiterBlockUnblockController: recruiterBlockUnblockController(dependencies),
		
	};
};
