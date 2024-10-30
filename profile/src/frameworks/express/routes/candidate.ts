import express, { Router } from 'express';

import { candidateProfileControllers, recruiterProfileControllers } from '../../../controllers';
import { IDependency } from '../../types/dependency';
import { auth, ROLES } from '@abijobportal/common';
import { multerConfig } from '../../../config/multer';

export const candidateRouter = (dependencies: IDependency) => {
    const router: Router = express.Router();

    const candidateProfileController = candidateProfileControllers(dependencies);
    const recruiterProfileController = recruiterProfileControllers(dependencies);

    // candidate authentication
    router.use(auth(ROLES.CANDIDATE));

    // candidate
    router.get('/', candidateProfileController.viewCandidateProfileController);
    router.patch('/', candidateProfileController.updateCandidateProfileController);
    router.patch('/skills', candidateProfileController.updateSkillsController);
    router.patch('/preferred-jobs', candidateProfileController.updatePreferredJobsController);

    router.patch(
        '/upload/image',
        multerConfig.single('file'),
        candidateProfileController.uploadCandidateProfilePicController,
    );
    router.patch(
        '/upload/resume',
        multerConfig.single('file'),
        candidateProfileController.uploadResumeController,
    );
    router.delete('/resume', candidateProfileController.deleteResumeController);
    router.get('/recruiter/:recruiterId', recruiterProfileController.viewRecruiterProfileController);

    return router;
};
