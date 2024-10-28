import express from 'express';
import { auth, ROLES } from '@abijobportal/common';

import { adminControllers } from '../../../controllers';
import { signinRequestBodyValidatorMiddlewares } from '../../middlewares/signinValidation';
import { IDependency } from '../../types/dependency';

export const adminRouter = (dependencies: IDependency) => {
    const router = express.Router();

    const adminController = adminControllers(dependencies);

    router.post('/signin', signinRequestBodyValidatorMiddlewares, adminController.adminSigninController);
    router.post('/signout', auth(ROLES.ADMIN), adminController.adminSignoutController);

    return router;
};
