import jwtRefreshController from './jwtRefresh.controller';

import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    return {
        jwtRefreshController: jwtRefreshController(dependencies),
    };
};
