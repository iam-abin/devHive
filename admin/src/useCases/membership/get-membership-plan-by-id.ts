export = (dependencies: any) => {
	const { repositories:{membershipRepository} } = dependencies;

	if (!membershipRepository) {
		throw new Error("membershipRepository should exist in dependencies");
	}

	const execute = (jobId: string) => {
		return membershipRepository.getById(jobId);
	};

	return { execute };
};
