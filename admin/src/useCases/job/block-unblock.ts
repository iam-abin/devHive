import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	const { repositories:{jobRepository} } = dependencies;

	if (!jobRepository) {
		throw new Error("jobRepository should exist in dependencies");
	}

	const execute = (jobId: string) => {
		return jobRepository.blockUnblock(jobId);
	};

	return { execute };
};
