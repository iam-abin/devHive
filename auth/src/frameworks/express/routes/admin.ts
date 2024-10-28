import express from 'express';
import { auth, ROLES } from '@abijobportal/common';

import { authControllers } from '../../../controllers';
import { signinRequestBodyValidatorMiddlewares } from '../../middlewares/signinValidation';
import { IDependency } from '../../types/dependency';

export const adminRouter = (dependencies: IDependency) => {
    const router = express.Router();

    const authController = authControllers(dependencies);

    router.post('/signin', signinRequestBodyValidatorMiddlewares, authController.signin);
    router.post('/signout', auth(ROLES.ADMIN), authController.signout);

    return router;
};
