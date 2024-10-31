import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        repositories: { candidateRepository },
    } = dependencies;

    if (!candidateRepository) {
        throw new Error('candidateRepository should exist in dependencies');
    }

    const execute = async (searchKey: string, page: number, limit: number) => {
        // pagination
        const skip = (page - 1) * limit;

        const candidates = await candidateRepository.searchCandidates(searchKey, skip, limit);
        const candidatesCount = await candidateRepository.getCountOfSearchedCandidates(searchKey);
        const numberOfPages = Math.ceil(candidatesCount / limit);

        return { candidates, numberOfPages };
    };

    return { execute };
};
