export = (dependencies: any) => {
	const { repositories:{candidateRepository} } = dependencies;

	if (!candidateRepository) {
		throw new Error("candidateRepository should exist in dependencies");
	}

	const execute = (userId: string) => {
		return candidateRepository.getById(userId);
	};

	return { execute };
};
