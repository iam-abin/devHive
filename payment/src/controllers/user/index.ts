import searchUserController from "./search-user.controller";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
		searchUserController: searchUserController(dependencies),
	};
};
