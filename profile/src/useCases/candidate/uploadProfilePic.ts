import { IDependency } from "../../frameworks/types/dependencyInterface";
import { CandidateProfileUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/candidate-profile-updated-publisher ";
import { kafkaClient } from "../../config/kafka.connection";
import { uploadProfilePic } from "../../frameworks/utils/uploads";
import { IFileData, IUploadResponse } from "../../frameworks/types/candidateProfile";
import { BadRequestError } from "@abijobportal/common";

export = (dependencies: IDependency) => {
	const {
		repositories: { candidateProfileRepository },
	} = dependencies;

	if (!candidateProfileRepository) {
		throw new Error("candidateProfileRepository should exist in dependencies");
	}

	const execute = async (profileId: string, file: IFileData) => {
		try {
			if (!file) throw new BadRequestError("you must upload a file")
			const uploadResult: IUploadResponse = await uploadProfilePic(file)


			const updatedProfile = await candidateProfileRepository.uploadProfilePic(profileId, uploadResult?.url);
			const candidateProfileUpdatedEvent = new CandidateProfileUpdatedEventPublisher(kafkaClient)
			await candidateProfileUpdatedEvent.publish({
				profile_image: updatedProfile?.profile_image,
				userId: updatedProfile?._id,
			})
			return updatedProfile
		} catch (error) {
			console.error(error);
			throw new Error("image upload failed");
		}
	};

	return { execute };
};
