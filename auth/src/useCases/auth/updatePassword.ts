import { IDependency } from '../../frameworks/types/dependency';
import { IUpdatePassword } from '../../frameworks/types/user';

export = (dependencies: IDependency) => {
    const {
        repositories: { usersRepository },
    } = dependencies;

    if (!usersRepository) throw new Error('usersRepository should exist in dependencies');

    const execute = async ({ userId, password }: IUpdatePassword) => {
        return await usersRepository.updatePassword({ userId, password });
    };

    return { execute };
};
