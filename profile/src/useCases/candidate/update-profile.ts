import { CandidateDataProfile } from "../../frameworks/types/candidate-profile-interface";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export  = (dependencies: IDependency) => {
	const { repositories:{candidateProfileRepository} } = dependencies;

	if (!candidateProfileRepository) {
		throw new Error("candidateProfileRepository should exist in dependencies");
	}

	const execute = async(existingData: any,updatedData: any) => {

		// const modifiedFields: { [key: string]: any } = {};
		// for (const field in updatedData) {
		//   if (updatedData[field] !== existingData[field]) {
		// 	modifiedFields[field] = updatedData[field];
		//   }
		// }
		
		if(updatedData.keySkills[1]){

			if(!updatedData.keySkills[1]){
				updatedData.keySkills = updatedData.keySkills[0].split(',')
			}
		}


        return await candidateProfileRepository.updateCandidateProfile(existingData._id,updatedData);
	};

    return { execute }
};
