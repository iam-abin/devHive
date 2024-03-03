import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const { repositories: { jobApplicationRepository } } = dependencies;

	if (!jobApplicationRepository) {
		throw new Error("jobApplicationRepository should exist in dependencies");
	}

	const execute = (jobApplicationId: string, status: string) => {
		return jobApplicationRepository.updateJobApplicationStatus(jobApplicationId, status);
	};

	return { execute };
};
