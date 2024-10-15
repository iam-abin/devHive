import express from "express";

import { premiumControllers } from "../../../controllers";
import { IDependenciesData } from "../../types/dependencyInterface";
import { checkCurrentUser, auth, ROLES } from "@abijobportal/common";

export const premiumRouter = (dependencies: IDependenciesData) => {
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
