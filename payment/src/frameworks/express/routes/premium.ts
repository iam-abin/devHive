import express from "express";

import { premiumControllers } from "../../../controllers";
import { IDependency } from "../../types/dependencyInterface";
import { checkCurrentUser, auth, ROLES } from "@abijobportal/common";

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
