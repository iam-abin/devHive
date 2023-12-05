import { Job } from "../../entities/job";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { JobInterface } from "../../frameworks/types/job-interface";

export = (dependencies: DependenciesData) => {
	const {
		repositories: { jobRepository },
	} = dependencies;

	if (!jobRepository) {
		throw new Error("jobRepository should exist in dependencies");
	}

	const execute = (jobData: JobInterface) => {
		const job = new Job(jobData);
		return jobRepository.createJob(job);
	};

	return { execute };
};
