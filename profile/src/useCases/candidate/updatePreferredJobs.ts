import { NotFoundError } from '@abijobportal/common';
import { kafkaClient } from '../../config/kafka.connection';
import { IDependency } from '../../frameworks/types/dependency';
import { CandidateProfileUpdatedEventPublisher } from '../../frameworks/utils/kafka-events/publishers/candidate-profile-updated-publisher ';
import { ICandidateProfile } from '../../frameworks/types/candidate';

export = (dependencies: IDependency) => {
    const {
        repositories: { candidateProfileRepository },
    } = dependencies;

    if (!candidateProfileRepository) {
        throw new Error('candidateProfileRepository should exist in dependencies');
    }

    const execute = async (profileId: string, jobs: Pick<ICandidateProfile, 'preferredJobs'>) => {
        const candidate = await candidateProfileRepository.getProfileByUserId(profileId);
        if (!candidate) throw new NotFoundError('Profile not found');

        const updatedCandidate = await candidateProfileRepository.updatePreferredJobs(profileId, jobs);

        const candidateProfileUpdatedEvent = new CandidateProfileUpdatedEventPublisher(kafkaClient);
        await candidateProfileUpdatedEvent.publish({
            userId: profileId,
            preferredJobs: updatedCandidate.preferredJobs,
        });

        return updatedCandidate;
    };

    return { execute };
};
