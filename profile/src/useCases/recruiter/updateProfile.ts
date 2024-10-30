import { NotFoundError, ROLES } from '@abijobportal/common';
import { IDependency } from '../../frameworks/types/dependency';
import { IRecruiterProfile } from '../../frameworks/types/recruiter';
import { RecruiterProfileUpdatedEventPublisher } from '../../frameworks/utils/kafka-events/publishers/recruiter-profile-updated-publisher';
import { kafkaClient } from '../../config/kafka.connection';
import { UserUpdatedEventPublisher } from '../../frameworks/utils/kafka-events/publishers/user-updated-publisher';

export = (dependencies: IDependency) => {
    const {
        repositories: { recruiterProfileRepository },
    } = dependencies;

    if (!recruiterProfileRepository)
        throw new Error('recruiterProfileRepository should exist in dependencies');

    const execute = async (recruiterId: string, updatedData: Partial<IRecruiterProfile>) => {
        const profile = await recruiterProfileRepository.getProfileByUserId(recruiterId);
        if (!profile) throw new NotFoundError('profile not found');

        const updatedProfile = await recruiterProfileRepository.updateRecruiterProfile(
            recruiterId,
            updatedData,
        );

        const recruiterProfileUpdatedEvent = new RecruiterProfileUpdatedEventPublisher(kafkaClient);
        await recruiterProfileUpdatedEvent.publish({
            name: updatedProfile?.name,
            email: updatedProfile?.email,
            phone: updatedProfile?.phone,
            isActive: updatedProfile?.isActive,
            gender: updatedProfile?.gender,
            profileImage: updatedProfile?.profileImage,
            about: updatedProfile?.about,
            companyName: updatedProfile.companyName,
            companyLocation: updatedProfile.companyLocation,
            companyWebsite: updatedProfile.companyWebsite,
            companyState: updatedProfile.companyState,
            companyCountry: updatedProfile.companyCountry,
            userId: updatedProfile._id,
        });

        await new UserUpdatedEventPublisher(kafkaClient).publish({
            name: updatedProfile.name,
            email: updatedProfile.email,
            phone: updatedProfile.phone,
            role: ROLES.RECRUITER,
            userId: updatedProfile.id!,
            isActive: updatedProfile.isActive!,
        });

        return profile;
    };

    return { execute };
};
