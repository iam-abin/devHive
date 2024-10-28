import updatePasswordController from './update.controller';

import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    return {
        updatePassword: updatePasswordController(dependencies),
    };
};
