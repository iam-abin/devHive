import { ForbiddenError, NotFoundError } from '@abijobportal/common';
import { IDependency } from '../../frameworks/types/dependency';
import { kafkaClient } from '../../config/kafka.connection';
import { UserUpdatedEventPublisher } from '../../frameworks/utils/kafka-events/publishers/user-updated-publisher';
import { CandidateProfileUpdatedEventPublisher } from '../../frameworks/utils/kafka-events/publishers/candidate-profile-updated-publisher ';
import { ICandidateProfile } from '../../frameworks/types/candidate';

export = (dependencies: IDependency) => {
    const {
        repositories: { candidateProfileRepository },
    } = dependencies;

    if (!candidateProfileRepository) {
        throw new Error('candidateProfileRepository should exist in dependencies');
    }

    const execute = async (candidateId: string, updatedData: Partial<ICandidateProfile>) => {
        const profile = await candidateProfileRepository.getProfileByUserId(candidateId);
        if (!profile) throw new NotFoundError('profile does not exist');

        if (profile.id.toString() !== candidateId)
            throw new ForbiddenError('You cannot modify others profile');

        if (updatedData.skills && updatedData.skills[1]) {
            if (!updatedData.skills[1]) {
                updatedData.skills = updatedData.skills[0].split(',');
            }
        }

        const updatedProfile = await candidateProfileRepository.updateCandidateProfile(
            profile._id,
            updatedData,
        );

        const candidateProfileUpdatedEvent = new CandidateProfileUpdatedEventPublisher(kafkaClient);
        await candidateProfileUpdatedEvent.publish({
            name: updatedProfile.name,
            email: updatedProfile.email,
            phone: updatedProfile.phone,
            isActive: updatedProfile.isActive,
            gender: updatedProfile.gender,
            currentLocation: updatedProfile.currentLocation,
            address: updatedProfile.address,
            skills: updatedProfile.skills,
            about: updatedProfile.about,
            experience: updatedProfile.experience,
            userId: updatedProfile._id,
        });

        await new UserUpdatedEventPublisher(kafkaClient).publish({
            name: updatedProfile.name,
            email: updatedProfile.email,
            phone: updatedProfile.phone,
            isActive: updatedProfile.isActive,
            role: 'candidate',
            userId: updatedProfile._id,
        });

        return updatedProfile;
    };

    return { execute };
};
