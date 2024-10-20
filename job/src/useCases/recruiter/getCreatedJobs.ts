import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	const { repositories: { jobRepository } } = dependencies;

	if (!jobRepository) {
		throw new Error("jobRepository should exist in dependencies");
	}

	const execute = async (recruiterId: string) => {
		return await jobRepository.getAllJobsByRecruiterId(recruiterId);
	};

	return { execute };
};
