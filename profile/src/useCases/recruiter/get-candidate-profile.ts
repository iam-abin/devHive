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

		// write code to remove some unwanted fields from result
		
		return profile;
	};

	return { execute };
};
