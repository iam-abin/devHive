import filterJobsController from './filterJobs.controller';
import viewAllJobsController from './getJobs.controller';
import viewJobByJobIdController from './getJob.controller';
import viewAllJobFieldsDistinctValuesController from './viewDistinctFieldValues.controller';

import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    return {
        filterJobsController: filterJobsController(dependencies),
        viewAllJobsController: viewAllJobsController(dependencies),
        viewAllJobFieldsDistinctValuesController: viewAllJobFieldsDistinctValuesController(dependencies),
        viewJobByJobIdController: viewJobByJobIdController(dependencies),
    };
};
