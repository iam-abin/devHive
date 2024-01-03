
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		repositories: { jobApplicationRepository },
	} = dependencies;

	if (!jobApplicationRepository) {
		throw new Error("jobApplicationRepository should exist in dependencies");
	}

	const execute = (jobApplicationId: string, applicationStatus: string) => {
		
		return jobApplicationRepository.changeJobApplicationStatus(jobApplicationId, applicationStatus);
	};

	return { execute };
};
