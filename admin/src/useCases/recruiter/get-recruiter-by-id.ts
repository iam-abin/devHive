export = (dependencies: any) => {
	const { repositories:{recruiterRepository} } = dependencies;

	if (!recruiterRepository) {
		throw new Error("recruiterRepository should exist in dependencies");
	}

	const execute = (id: string) => {
		return recruiterRepository.getById(id);
	};

	return { execute };
};
