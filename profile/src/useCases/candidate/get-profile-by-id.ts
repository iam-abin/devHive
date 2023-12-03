export = (dependencies: any) => {
	const {
		repositories: { candidateProfileRepository },
	} = dependencies;

	if (!candidateProfileRepository) {
		throw new Error(
			"candidateProfileRepository should exist in dependencies"
		);
	}

	const execute = async (id: string) => {
		const profile = await candidateProfileRepository.getProfileById(id);
		console.log(profile);
		
		return profile;
	};

	return { execute };
};
