import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const { repositories: { jobRepository } } = dependencies;

	if (!jobRepository) {
		throw new Error("jobRepository should exist in dependencies");
	}

	const execute = (applicationJobIds?: string[]) => {

		return jobRepository.getCountOfJobs(applicationJobIds)
	};

	return { execute };
};
