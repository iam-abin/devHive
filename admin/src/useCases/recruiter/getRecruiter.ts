import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        repositories: { recruiterRepository },
    } = dependencies;

    if (!recruiterRepository) {
        throw new Error('recruiterRepository should exist in dependencies');
    }

    const execute = async (userId: string) => {
        return await recruiterRepository.getById(userId);
    };

    return { execute };
};
