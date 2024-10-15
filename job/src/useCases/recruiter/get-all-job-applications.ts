
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	const { repositories: { jobApplicationRepository } } = dependencies;

	if (!jobApplicationRepository) {
		throw new Error("jobApplicationRepository should exist in dependencies");
	}

	// either recruiterId or candidateId can be null based on the request sender
	const execute = async(recruiterId: string, candidateId: string) => {
		return await jobApplicationRepository.getAllJobApplicationsByRecruiterId(recruiterId, candidateId);
	};

	return { execute };
};
