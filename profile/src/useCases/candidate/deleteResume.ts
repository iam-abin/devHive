import { kafkaClient } from '../../config/kafka.connection';
import { IDependency } from '../../frameworks/types/dependency';
import { CandidateProfileUpdatedEventPublisher } from '../../frameworks/utils/kafka-events/publishers/candidate-profile-updated-publisher ';

export = (dependencies: IDependency) => {
    const {
        repositories: { candidateProfileRepository },
    } = dependencies;

    if (!candidateProfileRepository) {
        throw new Error('candidateProfileRepository should exist in dependencies');
    }

    const execute = async (userId: string) => {
        const updatedProfile = await candidateProfileRepository.deleteResume(userId);

        const candidateProfileUpdatedEvent = new CandidateProfileUpdatedEventPublisher(kafkaClient);
        await candidateProfileUpdatedEvent.publish({
            resume: undefined,
            userId: updatedProfile?._id,
        });

        return updatedProfile;
    };

    return { execute };
};
