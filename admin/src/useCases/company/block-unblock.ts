import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const { repositories:{companyRepository} } = dependencies;

	if (!companyRepository) {
		throw new Error("companyRepository should exist in dependencies");
	}

	const execute = (id: string) => {
		return companyRepository.blockUnblock(id);
	};

	return { execute };
};
