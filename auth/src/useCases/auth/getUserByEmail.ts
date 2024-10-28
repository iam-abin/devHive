import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        repositories: { usersRepository },
    } = dependencies;

    if (!usersRepository) throw new Error('usersRepository should exist in dependencies');

    const execute = async (email: string) => {
        return await usersRepository.getByEmail(email);
    };

    return { execute };
};
