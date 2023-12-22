import express from "express";

// import { requireAuthRecruiter } from "@abijobportal/common";
import { jwtRefreshControllers } from "../../controllers";
// import { signupRequestBodyValidatorMiddlewares } from "../middlewares/signupValidation";
// import { signinRequestBodyValidatorMiddlewares } from "../middlewares/signinValidation";
import { DependenciesData } from "../types/dependencyInterface";

export const jwtRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const {
		jwtRefreshController
	} = jwtRefreshControllers(dependencies);

	router.post("/refreshToken", jwtRefreshController);

	return router;
};
