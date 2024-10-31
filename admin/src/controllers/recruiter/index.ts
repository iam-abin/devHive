import getAllRecruitersController from './getRecruiters.controller';
import getRecruiterByIdController from './viewProfile.controller';
import recruiterBlockUnblockController from './blockUnblock.controller';
import searchRecruitersController from './search.controller';

import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    return {
        getAllRecruitersController: getAllRecruitersController(dependencies),
        getRecruiterByIdController: getRecruiterByIdController(dependencies),
        recruiterBlockUnblockController: recruiterBlockUnblockController(dependencies),
        searchRecruitersController: searchRecruitersController(dependencies),
    };
};
