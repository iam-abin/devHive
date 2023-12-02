export = (dependencies: any) => {
	const {
		repositories: { recruiterProfileRepository },
	} = dependencies;

	if (!recruiterProfileRepository) {
		throw new Error(
			"recruiterProfileRepository should exist in dependencies"
		);
	}

	const execute = (id: string) => {
		const createdToken = recruiterProfileRepository.getProfileById(id);
		
		return createdToken;
	};

	return { execute };
};
