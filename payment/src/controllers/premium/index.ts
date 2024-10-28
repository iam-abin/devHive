import getAllPremiumPlansByCandidateController from './getPremiumPlans.controller';

import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    return {
        getAllPremiumPlansByCandidateController: getAllPremiumPlansByCandidateController(dependencies),
    };
};
