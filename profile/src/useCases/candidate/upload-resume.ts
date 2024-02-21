import { cloudinary } from "../../config/cloudinary";
import streamifier from "streamifier";

export = (dependencies: any)=>{
    const { repositories:{candidateProfileRepository} } = dependencies;

    if (!candidateProfileRepository) {
		throw new Error("candidateProfileRepository should exist in dependencies");
	}

    const execute = async (id: string, file: any) => {
		try {
			if (!file) {
				console.log("No files uploaded");
				return; // Return or handle accordingly
			}

			console.log("inside usecase resume file", file);
			

			const uploadResult: { public_id: string, url: string} = await new Promise((resolve, reject) => {
			// const uploadResult: any = await new Promise((resolve, reject) => {
				const cloudinary_upload_stream = cloudinary.uploader.upload_stream(
					{ folder: "devHive_Resumes" },
					(error, result: any) => {
						if (error) {
							console.error(error);
							reject(error);
						} else {
							console.log(result);
							resolve({
								public_id: result.public_id,
								url: result.secure_url,
							});
							// resolve(result);
						}
					}
				);

				streamifier.createReadStream(file.buffer).pipe(cloudinary_upload_stream);
			});
			
			console.log("inside upload resume usecase uploadresult ", uploadResult);
            return await candidateProfileRepository.uploadResume(id, uploadResult?.url, file.originalname );
		} catch (error) {
			console.error(error);
			// Handle the error appropriately
		}
	};

	return { execute };
}