export = (dependencies: any) => {
	const {
		repositories: { companyProfileRepository },
	} = dependencies;

	if (!companyProfileRepository) {
		throw new Error(
			"companyProfileRepository should exist in dependencies"
		);
	}

	const execute = async (id: string) => {
		const profile = await companyProfileRepository.getById(id);

		// write code to remove some unwanted fields from result
		
		return profile;
	};

	return { execute };
};
