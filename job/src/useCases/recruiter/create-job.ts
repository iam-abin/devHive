import { Job } from "../../entities/job";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { IJob } from "../../frameworks/types/job-interface";

export = (dependencies: IDependency) => {
	const { repositories: { jobRepository } } = dependencies;

	if (!jobRepository) throw new Error("jobRepository should exist in dependencies");
	
	const execute = async (jobData: IJob) => {
		const job = new Job(jobData);
		return await jobRepository.createJob(job);
	};

	return { execute };
};
