import jwtRefreshController from "./jwt-refresh.controller";

import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency) => {
	return {
        jwtRefreshController: jwtRefreshController(dependencies),
	};
};