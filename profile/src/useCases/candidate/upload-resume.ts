import { cloudinary } from "../../config/cloudinary";
import streamifier from "streamifier";

export = (dependencies: any)=>{
    const { repositories:{candidateProfileRepository} } = dependencies;

    if (!candidateProfileRepository) {
		throw new Error("candidateProfileRepository should exist in dependencies");
	}

    // const cloudinaryUpload = (file: any) => {
    //     const result = cloudinary.uploader.upload_stream(
    //         { folder: 'devHiveImages' },
    //         (error: any, result: any) => {
    //             if (error) {
    //                 console.error('Cloudinary upload error:', error);
                    
    //             } else {
    //                 console.log('Cloudinary upload result:', result);
    //             }
    //         }
    //     ).end(file.buffer);

    //     return result;
    // };


    

    // const execute = async (id: string, file: any)=>{
    //     // const response: any = cloudinaryUpload(file)
    //     console.log("inside upload resume usecase uploadresult ", response);
    //     return await candidateProfileRepository.uploadResume(id, response?.secure_url);
    // }

    // return { execute }

    const execute = async (id: string, file: any) => {
		try {
			if (!file) {
				console.log("No files uploaded");
				return; // Return or handle accordingly
			}

			const uploadResult: { public_id: string, url: string} = await new Promise((resolve, reject) => {
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
						}
					}
				);

				streamifier.createReadStream(file.buffer).pipe(cloudinary_upload_stream);
			});

			// Call your repository method with the result

			console.log("inside upload resume usecase uploadresult ", uploadResult);
			// return await candidateProfileRepository.uploadProfilePic(id, uploadResult?.url);
            return await candidateProfileRepository.uploadResume(id, uploadResult?.url);
		} catch (error) {
			console.error(error);
			// Handle the error appropriately
		}
	};

	return { execute };
}