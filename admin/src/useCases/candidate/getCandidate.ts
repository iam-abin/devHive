import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        repositories: { candidateRepository },
    } = dependencies;

    if (!candidateRepository) {
        throw new Error('candidateRepository should exist in dependencies');
    }

    const execute = async (userId: string) => {
        const candidate = await candidateRepository.getById(userId);
        return candidate;
    };

    return { execute };
};
