import express from 'express';
import { auth, ROLES } from '@abijobportal/common';

import { jobsControllers, candidateJobControllers, searchControllers } from '../../../controllers';
import { IDependency } from '../../types/dependency';

export const candidateRouter = (dependencies: IDependency) => {
    const router = express.Router();

    const jobsController = jobsControllers(dependencies);
    const candidateJobController = candidateJobControllers(dependencies);
    const searchController  = searchControllers(dependencies);
    
    
    router.get('/jobs/:page', jobsController.viewAllJobsController);

    router.post('/filter-bar-values', jobsController.viewAllJobFieldsDistinctValuesController);

    router.post('/filter/:page/:limit', jobsController.filterJobsController);
    
    router.use(auth(ROLES.CANDIDATE));

    router.get('/:id', jobsController.viewJobByJobIdController);

    router.post('/apply/:jobId', candidateJobController.applyJobController);

    router.get('/application/:jobApplicationId', candidateJobController.getAppliedJobApplicationController);

    router.get('/applied/:page/:limit', candidateJobController.appliedJobsController);

    router.get('/hasApplied/:jobId', candidateJobController.checkAppliedController);

    router.get('/search/:type/:page/:limit/', auth(ROLES.CANDIDATE), searchController.searchController);

    return router;
};
