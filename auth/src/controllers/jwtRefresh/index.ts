import jwtRefreshController from "./jwt-refresh.controller";

import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	return {
        jwtRefreshController: jwtRefreshController(dependencies),
	};
};