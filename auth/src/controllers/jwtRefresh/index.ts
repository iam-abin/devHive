import jwtRefreshController from "./jwt-refresh.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
        jwtRefreshController: jwtRefreshController(dependencies),
	};
};