import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const { repositories: { jobApplicationRepository } } = dependencies;

	if (!jobApplicationRepository) {
		throw new Error("jobRepository should exist in dependencies");
	}

	const execute = (candidateId: string) => {
		return jobApplicationRepository.getCountOfCandidateAppliedJobs(candidateId)
	};

	return { execute };
};
