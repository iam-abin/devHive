import { IDependency } from '../../frameworks/types/dependency';

import dashboardController from './dashboard.controller';
import getDashboardGraphDetailsController from './dashboardGraph.controller';

export = (dependencies: IDependency) => {
    return {
        dashboardCardsDataController: dashboardController(dependencies),
        getDashboardGraphDetailsController: getDashboardGraphDetailsController(dependencies),
    };
};
