
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const { repositories: { jobApplicationRepository } } = dependencies;

	if (!jobApplicationRepository) {
		throw new Error("jobApplicationRepository should exist in dependencies");
	}

	const execute = (jobApplicationId: string) => {
		return jobApplicationRepository.getAJobApplicationByRecruiter(jobApplicationId);
	};

	return { execute };
};



