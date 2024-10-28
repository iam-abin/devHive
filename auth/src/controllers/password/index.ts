import updatePasswordController from './update.controller';

import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    return {
        updatePasswordController: updatePasswordController(dependencies),
    };
};
