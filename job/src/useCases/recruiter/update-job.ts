import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		repositories: { jobRepository },
	} = dependencies;

	if (!jobRepository) {
		throw new Error("jobRepository should exist in dependencies");
	}

	const execute = async(id: string, data: object) => {
		return await jobRepository.updateJob(id, data);
	};

	return { execute };
};
