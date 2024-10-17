import { kafkaClient } from "../../config/kafka.connection";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { CandidateProfileUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/candidate-profile-updated-publisher ";

export = (dependencies: IDependency) => {
	const {
		repositories: { candidateProfileRepository },
	} = dependencies;

	if (!candidateProfileRepository) {
		throw new Error(
			"candidateProfileRepository should exist in dependencies"
		);
	}

	const execute = async (userId: string) => {
		const updatedProfile = await candidateProfileRepository.deleteResume(userId);

        const candidateProfileUpdatedEvent = new CandidateProfileUpdatedEventPublisher(kafkaClient)
        await candidateProfileUpdatedEvent.publish({
            name: updatedProfile?.name,
            email: updatedProfile?.email,
            phone: updatedProfile?.phone,
            isActive: updatedProfile?.isActive,
            gender: updatedProfile?.gender,
            currentLocation: updatedProfile?.currentLocation,
            address: updatedProfile?.address,
            skills: updatedProfile?.skills,
            profile_image: updatedProfile?.profile_image,
            about: updatedProfile?.about,
            resume: updatedProfile?.resume,
            experience: updatedProfile?.experience,
            userId: updatedProfile?.userId,
        })
        
		return updatedProfile;
	};

	return { execute };
};
