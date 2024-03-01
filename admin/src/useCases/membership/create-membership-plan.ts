import { Job } from "../../entities/job";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { JobInterface } from "../../frameworks/types/job-interface";

export = (dependencies: DependenciesData) => {
	const {
		repositories: { membershipRepository },
	} = dependencies;

	if (!membershipRepository) {
		throw new Error("membershipRepository should exist in dependencies");
	}

	const execute = async (jobData: JobInterface) => {
		const job = new Job(jobData);
		console.log("in execute ", job);
		
		return await membershipRepository.createJob(job);
	};

	return { execute };
};
