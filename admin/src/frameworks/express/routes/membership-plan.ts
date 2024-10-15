import express, { Router } from "express";
import { IDependency } from "../../types/dependencyInterface";
import { membershipControllers } from "../../../controllers";

export const membershipPlanRouter = (dependencies: IDependency) => {
	const router: Router = express.Router();

	const membershipController = membershipControllers(dependencies);

	router.post("/create-membership-plan", membershipController.createMembershipController);
	router.get("/view-membership-plans", membershipController.viewAllMembershipsController);
	router.get(
		"/view-membership-plan/:membershipPlanId",
		membershipController.viewMembershipController
	);
	router.put(
		"/block-unblock-membership-plan/:membershipPlanId",
		membershipController.blockUnblockMembershipController
	);
	router.patch("/update-membership-plan", membershipController.updateMembershipController);

	return router;
};
