import cratePaymentController from './createPayment.controller';

import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    return {
        cratePaymentController: cratePaymentController(dependencies),
    };
};
