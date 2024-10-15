import { cloudinary } from "../../config/cloudinary";
import streamifier from "streamifier";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency)=>{
    const { repositories:{candidateProfileRepository} } = dependencies;

    if (!candidateProfileRepository) throw new Error("candidateProfileRepository should exist in dependencies");

    const execute = async (id: string, file: any) => {
		try {
			if (!file) return; // Return or handle accordingly
			
            return await candidateProfileRepository.uploadResume(id, file?.url, file?.filename );
		} catch (error) {
			console.error(error);
			// Handle the error appropriately
		}
	};

	return { execute };
}