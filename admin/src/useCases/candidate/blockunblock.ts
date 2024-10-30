import { NotFoundError } from '@abijobportal/common';
import { kafkaClient } from '../../config/kafka.connection';
import { IDependency } from '../../frameworks/types/dependency';
import { UserUpdatedEventPublisher } from '../../frameworks/utils/kafka-events/publishers/user-updated-publisher';
import { ICandidateDocument } from '../../frameworks/database';

export = (dependencies: IDependency) => {
    const {
        repositories: { candidateRepository },
    } = dependencies;

    if (!candidateRepository) {
        throw new Error('candidateRepository should exist in dependencies');
    }

    const execute = async (userId: string) => {
        const user = await candidateRepository.getById(userId);
        if (!user) throw new NotFoundError('User not found');

        const userUpdatedEvent = new UserUpdatedEventPublisher(kafkaClient);

        const isBlocked: Partial<ICandidateDocument> = await candidateRepository.blockUnblock(userId);
        await userUpdatedEvent.publish({
            userId: isBlocked.id,
            role: isBlocked.role,
            isActive: isBlocked.isActive!,
        });

        return isBlocked;
    };

    return { execute };
};
