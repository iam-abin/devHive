import { IDependency } from '../../frameworks/types/dependency';

import adminSigninController from './signin.controller';
import adminSignoutController from './signout.controller';

export = (dependencies: IDependency) => {
    return {
        adminSigninController: adminSigninController(dependencies),
        adminSignoutController: adminSignoutController(),
    };
};
