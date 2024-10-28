import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        repositories: { notificationsRepository },
    } = dependencies;

    if (!notificationsRepository) {
        throw new Error('jobApplicationRepository should exist in dependencies');
    }

    const execute = async (senderId: string, receiverId: string) => {
        return await notificationsRepository.getUnreadMessagesCount(receiverId, senderId);
    };

    return { execute };
};
