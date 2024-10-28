import applyJobController from './apply.controller';
import appliedJobsController from './appliedJobs.controller';
import checkAppliedController from './checkApplied.controller';
import getAppliedJobApplicationController from './getApplication.controller';

import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    return {
        applyJobController: applyJobController(dependencies),
        appliedJobsController: appliedJobsController(dependencies),
        checkAppliedController: checkAppliedController(dependencies),
        getAppliedJobApplicationController: getAppliedJobApplicationController(dependencies),
    };
};
