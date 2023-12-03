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
		console.log("hgftd");

		const modifiedFields: { [key: string]: any } = {};
		for (const field in updatedData) {
			if (updatedData[field] !== existingData[field]) {
				modifiedFields[field] = updatedData[field];
			}
		}

		console.log("modified fields", modifiedFields);

		return await recruiterProfileRepository.updateRecruiterProfile(existingData.id,modifiedFields);
	};

	return { execute };
};
