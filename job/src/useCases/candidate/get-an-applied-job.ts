
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const { repositories: { jobApplicationRepository } } = dependencies;

	if (!jobApplicationRepository) {
		throw new Error("jobApplicationRepository should exist in dependencies");
	}

	const execute = ( candidateId: string, jobApplicationId: string) => {
		
		return jobApplicationRepository.getAnAppliedJobByCandidate(candidateId, jobApplicationId);
	};

	return { execute };
};
