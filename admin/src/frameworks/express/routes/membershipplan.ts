import express, { Router } from 'express';
import { IDependency } from '../../types/dependency';
import { membershipControllers } from '../../../controllers';

export const membershipPlanRouter = (dependencies: IDependency) => {
    const router: Router = express.Router();

    const membershipController = membershipControllers(dependencies);

    router.post('/create', membershipController.createMembershipController);
    router.get('/plans/:page/:limit', membershipController.viewAllMembershipsController);
    router.get('/plan/:membershipPlanId', membershipController.viewMembershipController);
    router.put('/block-unblock/:membershipPlanId', membershipController.blockUnblockMembershipController);

    return router;
};
