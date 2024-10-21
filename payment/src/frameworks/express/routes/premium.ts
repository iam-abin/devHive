import express from "express";
import { checkCurrentUser, auth, ROLES } from "@abijobportal/common";

import { premiumControllers } from "../../../controllers";
import { IDependency } from "../../types/dependency";

export const premiumRouter = (dependencies: IDependency) => {
    const router = express.Router();

    const premiumController = premiumControllers(dependencies);

    router.get(
        "/get-all-premium-plans-candidate",
        checkCurrentUser,
        auth(ROLES.CANDIDATE),
        premiumController.getAllPremiumPlansByCandidateController
    );

    return router;
};
