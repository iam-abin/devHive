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
			
            return await candidateProfileRepository.uploadResume(id, file?.url, file?.filename );
		} catch (error) {
			console.error(error);
			// Handle the error appropriately
		}
	};

	return { execute };
}