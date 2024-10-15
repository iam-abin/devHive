import jwtRefreshController from "./jwt-refresh.controller";

import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	return {
        jwtRefreshController: jwtRefreshController(dependencies),
	};
};