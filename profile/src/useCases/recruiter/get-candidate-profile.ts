export = (dependencies: any) => {
	const {
		repositories: { candidateProfileRepository },
	} = dependencies;

	if (!candidateProfileRepository) {
		throw new Error(
			"candidateProfileRepository should exist in dependencies"
		);
	}

	const execute = (id: string) => {
		const candidate = candidateProfileRepository.getProfileById(id);

		// write code to remove some unwanted fields from result
		
		return candidate;
	};

	return { execute };
};
