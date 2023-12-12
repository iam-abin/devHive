export = (dependencies: any) => {
	const { repositories:{jobRepository} } = dependencies;

	if (!jobRepository) {
		throw new Error("jobRepository should exist in dependencies");
	}

	const execute = (id: string) => {
		return jobRepository.blockUnblock(id);
	};

	return { execute };
};
