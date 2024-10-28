import { NotFoundError } from '@abijobportal/common';
import { IUserDocument } from '../../frameworks/database/mongo/models/user';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        repositories: { userRepository, notificationsRepository },
    } = dependencies;

    if (!notificationsRepository) {
        throw new Error('notificationsRepository should exist in dependencies');
    }

    if (!userRepository) {
        throw new Error('userRepository should exist in dependencies');
    }

    const execute = async (userId: string) => {
        const user: IUserDocument | null = await userRepository.getById(userId);
        if (!user) throw new NotFoundError('user does not exist');
        return notificationsRepository.getAllNotificationsCountByUserId(userId);
    };

    return { execute };
};
