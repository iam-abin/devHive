import { CandidateDataProfile } from "../../frameworks/types/candidate-profile-interface";

export = (dependencies: any) => {
	const {
		repositories: { recruiterProfileRepository },
	} = dependencies;

	if (!recruiterProfileRepository) {
		throw new Error(
			"recruiterProfileRepository should exist in dependencies"
		);
	}

	const execute = async (existingData: any, updatedData: any) => {
		console.log("existingData", existingData);
		console.log("updatedData", updatedData);
		
		console.log("hgftd");

		// //  function to find the changes fields to update
		// const modifiedFields: { [key: string]: any } = {};
		// for (const field in updatedData) {
		// 	if (updatedData[field] !== existingData[field]) {
		// 		modifiedFields[field] = updatedData[field];
		// 	}
		// }


		return await recruiterProfileRepository.updateRecruiterProfile(existingData._id,updatedData);
	};

	return { execute };
};
