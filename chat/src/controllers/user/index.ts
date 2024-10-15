import searchUserController from "./search-user.controller";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	return {
		searchUserController: searchUserController(dependencies),
	};
};
