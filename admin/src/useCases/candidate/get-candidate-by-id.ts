export = (dependencies: any) => {
	const { repositories:{candidateRepository} } = dependencies;

	if (!candidateRepository) {
		throw new Error("candidateRepository should exist in dependencies");
	}

	const execute = (userId: string) => {
		console.log("inside get candidate profile by id repo, " ,userId);
		
		return candidateRepository.getById(userId);
	};

	return { execute };
};
