import express from 'express';

import { recruiterProfileControllers, candidateProfileControllers } from '../../../controllers';

import { IDependency } from '../../types/dependency';
import { auth, ROLES } from '@abijobportal/common';

export const recruiterRouter = (dependencies: IDependency) => {
    const router = express.Router();

    const recruiterProfileController = recruiterProfileControllers(dependencies);
    const candidateProfileController = candidateProfileControllers(dependencies);

    // recruiter
    router.use(auth(ROLES.RECRUITER));

    router.get('/', recruiterProfileController.viewRecruiterProfileController);
    router.patch('/', recruiterProfileController.updateRecruiterProfileController);
    router.get('/candidate/:candidateId', candidateProfileController.viewCandidateProfileController);
    router.get('/candidates/:page', recruiterProfileController.viewAllCandidatesProfilesController);

    return router;
};
