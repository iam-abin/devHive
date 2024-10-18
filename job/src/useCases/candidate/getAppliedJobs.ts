import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	const { repositories: { jobApplicationRepository }} = dependencies;

	if (!jobApplicationRepository) {
		throw new Error(
			"jobApplicationRepository should exist in dependencies"
		);
	}

	const execute = async(candidateId: string, skip: number, limit: number) => {
		const appliedJobsCount = await jobApplicationRepository.getCountOfCandidateAppliedJobs(candidateId);
		const appliedJobs = await jobApplicationRepository.getAllAppliedJobsByCandidateId(
			candidateId,
			skip,
			limit
		);

		return {appliedJobs, appliedJobsCount}
	};

	return { execute };
};
