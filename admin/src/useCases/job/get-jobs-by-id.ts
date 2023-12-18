export = (dependencies: any) => {
	const { repositories:{jobRepository} } = dependencies;

	if (!jobRepository) {
		throw new Error("jobRepository should exist in dependencies");
	}

	const execute = (jobId: string) => {
		return jobRepository.getById(jobId);
	};

	return { execute };
};
