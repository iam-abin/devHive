import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency) => {
	const {
		repositories: { recruiterProfileRepository, candidateProfileRepository },
	} = dependencies;

	if (!recruiterProfileRepository) {
		throw new Error(
			"recruiterProfileRepository should exist in dependencies"
		);
	}

	const execute = async() => {
		const count = await candidateProfileRepository.getCountOfCandidatesProfiles();
		
		return count;
	};

	return { execute };
};
