import express from 'express';
import { auth, ROLES } from '@abijobportal/common';

import { jobsControllers, candidateJobControllers } from '../../../controllers';
import { IDependency } from '../../types/dependency';

export const candidateRouter = (dependencies: IDependency) => {
    const router = express.Router();

    const jobsController = jobsControllers(dependencies);
    const candidateJobController = candidateJobControllers(dependencies);

    router.get('/jobs/:page', jobsController.viewAllJobsController);

    router.post('/filter-bar-values', jobsController.viewAllJobFieldsDistinctValuesController);

    router.post('/filter/:page/:limit', jobsController.filterJobsController);

    router.use(auth(ROLES.CANDIDATE));

    router.get('/:id', jobsController.viewJobByJobIdController);

    // router.post('/search/:page', jobsController.searchJobsController);

    router.post('/apply/:jobId', candidateJobController.applyJobController);

    router.get('/application/:jobApplicationId', candidateJobController.getAppliedJobApplicationController);

    router.get('/applied/:candidateId/:page', candidateJobController.appliedJobsController);

    router.get('/hasApplied/:jobId', candidateJobController.checkAppliedController);

    return router;
};
