import express from "express";


import { companyControllers } from "../../../controllers";
import { DependenciesData } from "../../types/dependencyInterface";
import { requireAuthAdmin } from "@abijobportal/common";

export const companyRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const {
		blockUnblockCompanyController,
        viewCompaniesController,
        viewCompanyProfileController
	} = companyControllers(dependencies);

	// router.use(requireAuthAdmin)

	// // company

    // router.get("/companies", requireAuthAdmin, viewCompaniesController);
	// router.get("/viewCompanyProfile", requireAuthAdmin, viewCompanyProfileController);
	// router.put("/blockUnblock/:id", requireAuthAdmin, blockUnblockCompanyController);

	router.get("/companies", viewCompaniesController);
	router.get("/viewCompanyProfile", viewCompanyProfileController);
	router.put("/blockUnblock/:id", blockUnblockCompanyController);

	return router;
};
