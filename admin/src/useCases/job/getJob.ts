import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency) => {
	const { repositories:{jobRepository} } = dependencies;

	if (!jobRepository) {
		throw new Error("jobRepository should exist in dependencies");
	}

	const execute = async(jobId: string) => {
		return await jobRepository.getById(jobId);
	};

	return { execute };
};
