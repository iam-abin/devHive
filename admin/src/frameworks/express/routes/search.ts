import express, { Router } from 'express';
import { IDependency } from '../../types/dependency';
import { searchControllers } from '../../../controllers';

export const searchRouter = (dependencies: IDependency) => {
    const router: Router = express.Router();

    const searchController  = searchControllers(dependencies);

    router.get('/:type/:page/:limit/', searchController.searchController);

    return router;
};
