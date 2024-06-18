import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const { repositories:{candidateRepository} } = dependencies;

	if (!candidateRepository) {
		throw new Error("candidateRepository should exist in dependencies");
	}

	const execute = () => {
		return candidateRepository.getAllCandidates();
	};

	return { execute };
};
