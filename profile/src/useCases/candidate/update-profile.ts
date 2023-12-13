import { CandidateDataProfile } from "../../frameworks/types/candidate-profile-interface";

export  = (dependencies: any) => {
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
		


        return await candidateProfileRepository.updateCandidateProfile(existingData.userId,updatedData);
	};

    return { execute }
};
