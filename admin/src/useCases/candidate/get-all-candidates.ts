import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	const { repositories:{candidateRepository} } = dependencies;

	if (!candidateRepository) {
		throw new Error("candidateRepository should exist in dependencies");
	}

	const execute = async() => {
		const candidates = await candidateRepository.getAllCandidates(); 
		return candidates
	};

	return { execute };
};
