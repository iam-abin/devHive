import { BadRequestError, ForbiddenError, NotFoundError } from "@abijobportal/common";
import { CandidateDataProfile } from "../../frameworks/types/candidateProfile";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { kafkaClient } from "../../config/kafka.connection";
import { UserUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/user-updated-publisher";
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

    const execute = async (candidateId: string, updatedData: any) => {
        
        const profile = await candidateProfileRepository.getProfileByUserId(
            candidateId
        );
        if (!profile) throw new NotFoundError("profile does not exist");

        if (profile.id.toString() !== candidateId)
            throw new ForbiddenError("You cannot modify others profile");

        const candidateProfileUpdatedEvent =
            new CandidateProfileUpdatedEventPublisher(kafkaClient);
        await candidateProfileUpdatedEvent.publish({
            name: updatedData?.name,
            email: updatedData?.email,
            phone: updatedData?.phone,
            isActive: updatedData?.isActive,
            gender: updatedData?.gender,
            currentLocation: updatedData?.currentLocation,
            address: updatedData?.address,
            skills: updatedData?.skills,
            about: updatedData?.about,
            experience: updatedData?.experience,
            userId: updatedData?.userId,
        });

        await new UserUpdatedEventPublisher(kafkaClient).publish({
            name: updatedData?.name,
            email: updatedData?.email,
            phone: updatedData?.phone,
            isActive: updatedData?.isActive,
            role: "candidate",
            userId: updatedData?.userId,
        });

        if (updatedData.skills[1]) {
            if (!updatedData.skills[1]) {
                updatedData.skills = updatedData.skills[0].split(",");
            }
        }

		const updatedProfile = await candidateProfileRepository.updateCandidateProfile(
			profile._id,
            updatedData
        );
		return updatedProfile
    };

    return { execute };
};
