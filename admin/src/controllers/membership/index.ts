import { IDependency } from "../../frameworks/types/dependencyInterface";

import createMembershipController from "./create-membership.controller";
import updateMembershipController from "./update-membership.controller";
import blockUnblockMembershipController from "./block-unblock-membership.controller";
import viewAllMembershipsController from "./view-all-memberships.controller";
import viewMembershipController from "./view-membership.controller";

export = (dependencies: IDependency) => {
	return {
		createMembershipController: createMembershipController(dependencies),
		updateMembershipController: updateMembershipController(dependencies),
		blockUnblockMembershipController: blockUnblockMembershipController(dependencies),
		viewAllMembershipsController: viewAllMembershipsController(dependencies),
		viewMembershipController: viewMembershipController(dependencies),
	};
};
