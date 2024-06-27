import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const { repositories: { jobRepository } } = dependencies;

	if (!jobRepository) {
		throw new Error("jobRepository should exist in dependencies");
	}

	const execute = (recruiterId: string) => {
		return jobRepository.getAllJobsByRecruiterId(recruiterId);
	};

	return { execute };
};
