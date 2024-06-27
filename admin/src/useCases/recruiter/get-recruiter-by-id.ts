import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const { repositories:{recruiterRepository} } = dependencies;

	if (!recruiterRepository) {
		throw new Error("recruiterRepository should exist in dependencies");
	}

	const execute = (userId: string) => {
		return recruiterRepository.getById(userId);
	};

	return { execute };
};
