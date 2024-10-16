import { IDependency } from "../../frameworks/types/dependencyInterface";

import createMembershipController from "./createMembership.controller";
import updateMembershipController from "./updateMembership.controller";
import blockUnblockMembershipController from "./block-unblock-membership.controller";
import viewAllMembershipsController from "./viewMemberships.controller";
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
