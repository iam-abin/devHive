import express, { Router } from 'express';
import { IDependency } from '../../types/dependency';
import { paymentControllers } from '../../../controllers';

export const paymentRouter = (dependencies: IDependency) => {
    const router: Router = express.Router();

    const paymentController = paymentControllers(dependencies);

    router.get('/get-all-payments/:page/:limit', paymentController.getAllPaymentsController);

    return router;
};
