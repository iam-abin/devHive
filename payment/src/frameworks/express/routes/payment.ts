import express from 'express';

import { paymentControllers } from '../../../controllers';
import { IDependency } from '../../types/dependency';

export const paymentRouter = (dependencies: IDependency) => {
    const router = express.Router();

    const paymentController = paymentControllers(dependencies);

    router.post('/create', paymentController.cratePaymentController);

    return router;
};
