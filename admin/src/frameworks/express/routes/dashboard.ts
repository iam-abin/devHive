import express, { Router } from 'express';
import { dashboardControllers } from '../../../controllers';
import { IDependency } from '../../types/dependency';

export const dashboardRouter = (dependencies: IDependency) => {
    const router: Router = express.Router();

    const dashboardController = dashboardControllers(dependencies);

    // dashboard
    router.get('/cards-data', dashboardController.dashboardCardsDataController);

    router.get('/graph-data', dashboardController.getDashboardGraphDetailsController);

    return router;
};
