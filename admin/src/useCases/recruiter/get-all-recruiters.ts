export = (dependencies: any) => {
	const { repositories:{recruiterRepository} } = dependencies;

	if (!recruiterRepository) {
		throw new Error("recruiterRepository should exist in dependencies");
	}

	const execute = () => {
		return recruiterRepository.getAllRecruiters();
	};

	return { execute };
};
