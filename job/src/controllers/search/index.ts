import searchController from "./search.controller"
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    return {
        searchController: searchController(dependencies),
    };
};
