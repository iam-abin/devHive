import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const { repositories: { jobRepository } } = dependencies;

	if (!jobRepository) {
		throw new Error("jobRepository should exist in dependencies");
	}

	const execute = async(jobId: string, data: any) => {
		if(data.deadline){
			data.deadline = new Date(data.deadline)
		}

		return await jobRepository.updateJob(jobId, data);
	};

	return { execute };
};
