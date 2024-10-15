import { ForbiddenError, NotFoundError } from "@abijobportal/common";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const { repositories: { jobRepository } } = dependencies;

	if (!jobRepository) {
		throw new Error("jobRepository should exist in dependencies");
	}

	const execute = async(jobId: string, recruiterId: string) => {
		const job = await jobRepository.getAJob(jobId);
		if(!job) throw new NotFoundError();
		if(recruiterId !== job.recruiterId.toString()){
			throw new ForbiddenError("You cannot modify others job")
		}
		return await jobRepository.deleteJob(jobId);
	};

	return { execute };
};
