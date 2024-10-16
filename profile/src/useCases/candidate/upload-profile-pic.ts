import streamifier from "streamifier";
import { cloudinary } from "../../config/cloudinary";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { CandidateProfileUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/candidate-profile-updated-publisher ";
import { kafkaClient } from "../../config/kafka.connection";

export = (dependencies: IDependency) => {
	const {
		repositories: { candidateProfileRepository },
	} = dependencies;

	if (!candidateProfileRepository) {
		throw new Error("candidateProfileRepository should exist in dependencies");
	}

	const execute = async (id: string, file: any) => {
		try {
			if (!file) return; // Return or handle accordingly 

			const uploadResult: { public_id: string, url: string} = await new Promise((resolve, reject) => {
				const cloudinary_upload_stream = cloudinary.uploader.upload_stream(
					{ folder: "devHive_Profile_Pics" },
					(error, result: any) => {
						if (error) {
							console.error(error);
							reject(error);
						} else { 
							resolve({
								public_id: result.public_id,
								url: result.secure_url,
							});
						}
					}
				);

				streamifier.createReadStream(file.buffer).pipe(cloudinary_upload_stream);
			}); 

			const candidate = await candidateProfileRepository.uploadProfilePic(id, uploadResult?.url);
			
        
			const candidateProfileUpdatedEvent = new CandidateProfileUpdatedEventPublisher(kafkaClient)
			await candidateProfileUpdatedEvent.publish({
				profile_image: candidate?.profile_image,
				userId: candidate?._id,
			})
			return
		} catch (error) {
			console.error(error);
			// Handle the error appropriately
		}
	};

	return { execute };
};
