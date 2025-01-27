import express from 'express';

import { auth, ROLES } from '@abijobportal/common';
import { jobsControllers, recruiterJobControllers, searchControllers } from '../../../controllers';
import { IDependency } from '../../types/dependency';

export const recruiterRouter = (dependencies: IDependency) => {
    const router = express.Router();

    const jobsController = jobsControllers(dependencies);
    const recruiterJobController = recruiterJobControllers(dependencies);
    const searchController  = searchControllers(dependencies);


    router.get('/jobs/:page', jobsController.viewAllJobsController);

    router.use(auth(ROLES.RECRUITER));

    router.get('/:id', jobsController.viewJobByJobIdController);

    router.post('/create', recruiterJobController.createJobController);

    router.patch('/edit/:jobId', recruiterJobController.editJobController);

    router.delete('/:id', recruiterJobController.deleteJobController);

    router.patch('/change-close-status/:jobId', recruiterJobController.changeJobCloseStatusController);

    router.get('/created-jobs/:page/:limit', recruiterJobController.createdJobsByRecruiterController);

    router.get('/applications/:page/:limit', recruiterJobController.viewJobApplicationsController);

    router.patch(
        '/application/statuss/:jobApplicationId',
        recruiterJobController.changeJobApplicationStatusController,
    );
    router.get('/application/:jobApplicationId', recruiterJobController.viewJobApplicationController);

    router.get('/dashboard/cards-data', recruiterJobController.recruiterDashboardCardsController);

    router.get('/dashboard/graph-data', recruiterJobController.recruiterDashboardGraphController);

    router.get('/search/:type/:page/:limit', searchController.searchController);

    return router;
};
