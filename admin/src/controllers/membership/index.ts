import { IDependency } from "../../frameworks/types/dependency";

import createMembershipController from "./create.controller";
import updateMembershipController from "./update.controller";
import blockUnblockMembershipController from "./blockUnblock.controller";
import viewAllMembershipsController from "./getMemberships.controller";
import viewMembershipController from "./getMembership.controller";

export = (dependencies: IDependency) => {
	return {
		createMembershipController: createMembershipController(dependencies),
		updateMembershipController: updateMembershipController(dependencies),
		blockUnblockMembershipController: blockUnblockMembershipController(dependencies),
		viewAllMembershipsController: viewAllMembershipsController(dependencies),
		viewMembershipController: viewMembershipController(dependencies),
	};
};
