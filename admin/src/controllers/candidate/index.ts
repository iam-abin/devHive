import getAllCandidatesController from './getCandidates.controller';
import getCandidateByIdController from './viewProfile.controller';
import searchCandidatesController from './search.controller';
import candidateBlockUnblockController from './blockUnblock.controller';

import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    return {
        getAllCandidatesController: getAllCandidatesController(dependencies),
        getCandidateByIdController: getCandidateByIdController(dependencies),
        searchCandidatesController: searchCandidatesController(dependencies),
        candidateBlockUnblockController: candidateBlockUnblockController(dependencies),
    };
};
