import searchUserController from "./search-user.controller";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	return {
		searchUserController: searchUserController(dependencies),
	};
};
