
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const {
		repositories: { jobApplicationRepository },
	} = dependencies;

	if (!jobApplicationRepository) {
		throw new Error("jobApplicationRepository should exist in dependencies");
	}

	const execute = (candidateId: string, skip: number, limit: number) => {
		return jobApplicationRepository.getAllAppliedJobsByCandidateId(candidateId, skip,limit);
	};

	return { execute };
};
