import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const { repositories: { jobRepository } } = dependencies;

	if (!jobRepository) {
		throw new Error("jobRepository should exist in dependencies");
	}

	const execute = (skip: number, limit: number, applicationJobIds: string[]) => {
		return jobRepository.getAllJobs(skip,limit, applicationJobIds);
	};

	return { execute };
};
