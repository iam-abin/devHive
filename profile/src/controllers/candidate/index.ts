import viewCandidateProfileController from './viewProfile.controller';
import updateCandidateProfileController from './updateProfile.controller';
import uploadCandidateProfilePicController from './uploadProfilePic.controller';
import uploadResumeController from './uploadResume.controller';
import deleteResumeController from './deleteResume.controller';
import updateSkillsController from './updateSkills.controller';
import updatePreferredJobsController from './updatePreferredJobs.controller';

import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    return {
        viewCandidateProfileController: viewCandidateProfileController(dependencies),
        updateCandidateProfileController: updateCandidateProfileController(dependencies),
        uploadCandidateProfilePicController: uploadCandidateProfilePicController(dependencies),
        uploadResumeController: uploadResumeController(dependencies),
        deleteResumeController: deleteResumeController(dependencies),
        updateSkillsController: updateSkillsController(dependencies),
        updatePreferredJobsController: updatePreferredJobsController(dependencies),
    };
};
