import express from "express";

import { jwtRefreshControllers } from "../../../controllers";
import { DependenciesData } from "../../types/dependencyInterface";

export const jwtRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const {
		jwtRefreshController
	} = jwtRefreshControllers(dependencies);

	router.post("/refreshToken", jwtRefreshController);

	return router;
};
