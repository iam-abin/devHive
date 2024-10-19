import { NotFoundError } from "@abijobportal/common";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	const { repositories: { jobRepository } } = dependencies;

	if (!jobRepository) {
		throw new Error("jobRepository should exist in dependencies");
	}

	const execute = async (jobId: string) => {
		// console.log();
		
		const job = await jobRepository.getAJob(jobId);
		if(!job) throw new NotFoundError("job not found")
		return job
	};

	return { execute };
};
