import express from "express";

import { jwtRefreshControllers } from "../../../controllers";
import { IDependenciesData } from "../../types/dependencyInterface";

export const jwtRouter = (dependencies: IDependenciesData) => {
    const router = express.Router();

    const jwtController = jwtRefreshControllers(dependencies);

    router.post("/refreshToken", jwtController.jwtRefreshController);

    return router;
};
