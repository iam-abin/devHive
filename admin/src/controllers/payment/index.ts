import { IDependency } from '../../frameworks/types/dependency';

import getAllPaymentsController from './getPayments.controller';

export = (dependencies: IDependency) => {
    return {
        getAllPaymentsController: getAllPaymentsController(dependencies),
    };
};
