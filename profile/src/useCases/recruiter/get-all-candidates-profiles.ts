export = (dependencies: any) => {
	const {
		repositories: { recruiterProfileRepository, candidateProfileRepository },
	} = dependencies;

	if (!recruiterProfileRepository) {
		throw new Error(
			"recruiterProfileRepository should exist in dependencies"
		);
	}

	const execute = async(skip: number, limit: number) => {

		const profiles = await candidateProfileRepository.getAllCandidatesProfiles(skip, limit);
		return profiles;
	};
	

	return { execute };
};
