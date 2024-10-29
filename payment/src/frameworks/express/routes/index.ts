import express from 'express';

import { IDependency } from '../../types/dependency';
import { premiumRouter } from './premium';
import { paymentRouter } from './payment';
import { auth, checkCurrentUser, ROLES } from '@abijobportal/common';

export const routes = (dependencies: IDependency) => {
    const router = express.Router();

    const payment = paymentRouter(dependencies);
    const premium = premiumRouter(dependencies);

    router.use(checkCurrentUser);
    router.use(auth(ROLES.CANDIDATE));

    router.use('/payment', payment);
    router.use('/premium/candidate', premium);

    return router;
};
