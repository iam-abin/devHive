import { cloudinary } from "../../config/cloudinary";
import streamifier from "streamifier";
import { IDependency } from "../../frameworks/types/dependency";
import { CandidateProfileUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/candidate-profile-updated-publisher ";
import { kafkaClient } from "../../config/kafka.connection";
import { IResume } from "../../frameworks/types/candidate";
import { NotFoundError } from "@abijobportal/common";

export = (dependencies: IDependency) => {
    const {
        repositories: { candidateProfileRepository },
    } = dependencies;

    if (!candidateProfileRepository)
        throw new Error(
            "candidateProfileRepository should exist in dependencies"
        );

    const execute = async (profileId: string, file: IResume) => {
        try {
            if (!file) return; // Return or handle accordingly
            const profile = await candidateProfileRepository.findById(profileId);
            if(!profile) throw new NotFoundError("profile not found")
            const updatedProfile = await candidateProfileRepository.uploadResume(
                profileId,
                { url: file?.url, filename: file?.filename }
            );
            
            const candidateProfileUpdatedEvent =
                new CandidateProfileUpdatedEventPublisher(kafkaClient);
				
            await candidateProfileUpdatedEvent.publish({
                resume: updatedProfile?.resume.filename,
                userId: profile.id,
                isActive: false
            });
            return updatedProfile;
        } catch (error) {
            console.error(error);
            throw new Error("Resume upload failed")
            // Handle the error appropriately
        }
    };

    return { execute };
};
