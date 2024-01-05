export = (dependencies: any) => {
	const {
		repositories: { recruiterProfileRepository, candidateProfileRepository },
	} = dependencies;

	if (!recruiterProfileRepository) {
		throw new Error(
			"recruiterProfileRepository should exist in dependencies"
		);
	}

	const execute = async() => {
		const profile = await candidateProfileRepository.getCountOfCandidatesProfiles();
		
		return profile;
	};

	return { execute };
};
