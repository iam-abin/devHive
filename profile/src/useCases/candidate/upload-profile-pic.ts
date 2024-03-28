import streamifier from "streamifier";
import { cloudinary } from "../../config/cloudinary";

export = (dependencies: any) => {
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

			return await candidateProfileRepository.uploadProfilePic(id, uploadResult?.url);
		} catch (error) {
			console.error(error);
			// Handle the error appropriately
		}
	};

	return { execute };
};
