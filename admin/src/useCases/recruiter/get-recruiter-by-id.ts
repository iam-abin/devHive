export = (dependencies: any) => {
	const { repositories:{recruiterRepository} } = dependencies;

	if (!recruiterRepository) {
		throw new Error("recruiterRepository should exist in dependencies");
	}

	const execute = (userId: string) => {
		console.log(" in getRecruiterById useCase", userId);
		return recruiterRepository.getById(userId);
	};

	return { execute };
};
