import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

import blockUnblockCompanyController from "./block-unblock-company.controller";
import viewCompanyProfileController from "./view-company-profile.controller";
import viewCompaniesController from "./view-companies.controller";

export = (dependencies: IDependenciesData) => {
	return {
		blockUnblockCompanyController: blockUnblockCompanyController(dependencies),
		viewCompanyProfileController: viewCompanyProfileController(dependencies),
		viewCompaniesController: viewCompaniesController(dependencies)
	};
};
