import express from 'express';

import { jwtRefreshControllers } from '../../../controllers';
import { IDependency } from '../../types/dependency';

export const jwtRouter = (dependencies: IDependency) => {
    const router = express.Router();

    const jwtController = jwtRefreshControllers(dependencies);

    router.post('/refreshToken', jwtController.jwtRefreshController);

    return router;
};
