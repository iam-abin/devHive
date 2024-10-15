import { ForbiddenError } from "@abijobportal/common";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	const { repositories: { jobRepository } } = dependencies;

	if (!jobRepository) {
		throw new Error("jobRepository should exist in dependencies");
	}

	const execute = async(jobId: string, data: any, recruiterId: string) => {
		const job = await jobRepository.getAJob(jobId);
		
		if(recruiterId !== job.recruiterId.toString()){
			throw new ForbiddenError("You cannot modify others job")
		}
		
		if(data.deadline){
			data.deadline = new Date(data.deadline)
		}
		return await jobRepository.updateJob(jobId, data);
	};

	return { execute };
};
