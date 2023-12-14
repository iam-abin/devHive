export = (dependencies: any) => {
	const { repositories:{companyRepository} } = dependencies;

	if (!companyRepository) {
		throw new Error("companyRepository should exist in dependencies");
	}

	const execute = () => {
		return companyRepository.getAllCompanies();
	};

	return { execute };
};
