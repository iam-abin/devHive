import express, { Router } from 'express';
import { recruiterControllers } from '../../../controllers';
import { IDependency } from '../../types/dependency';

export const recruiterRouter = (dependencies: IDependency) => {
    const router: Router = express.Router();

    const recruiterController = recruiterControllers(dependencies);

    router.get('/recruiters/:page/:limit', recruiterController.getAllRecruitersController);
    router.get('/recruiters/search/:page/:limit', recruiterController.searchRecruitersController);
    router.get('/view-profile/:userId', recruiterController.getRecruiterByIdController);
    router.put('/block-unblock/:userId', recruiterController.recruiterBlockUnblockController);

    return router;
};
