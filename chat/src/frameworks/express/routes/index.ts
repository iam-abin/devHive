import express from 'express';

import { IDependency } from '../../types/dependency';
import { chatRouter } from './routes';

import { auth, checkCurrentUser, ROLES } from '@abijobportal/common';

export const routes = (dependencies: IDependency) => {
    const router = express.Router();

    const routes = chatRouter(dependencies);

    router.use('/candidate', checkCurrentUser, auth(ROLES.CANDIDATE), routes);
    router.use('/recruiter', checkCurrentUser, auth(ROLES.RECRUITER), routes);

    return router;
};
