
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const { repositories: { jobApplicationRepository } } = dependencies;

	if (!jobApplicationRepository) {
		throw new Error("jobApplicationRepository should exist in dependencies");
	}

	// either recruiterId or candidateId can be null based on the request sender
	const execute = (recruiterId: string, candidateId: string) => {
		return jobApplicationRepository.getAllJobApplicationsByRecruiterId(recruiterId, candidateId);
	};

	return { execute };
};
