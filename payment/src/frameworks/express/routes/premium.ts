import express from 'express';
import { premiumControllers } from '../../../controllers';
import { IDependency } from '../../types/dependency';

export const premiumRouter = (dependencies: IDependency) => {
    const router = express.Router();

    const premiumController = premiumControllers(dependencies);

    router.get('/plans', premiumController.getAllPremiumPlansByCandidateController);

    return router;
};
