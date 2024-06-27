import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const {
		repositories: {
			jobRepository,
			jobApplicationRepository,
		},
	} = dependencies;

	if (!jobRepository) throw new Error("jobRepository should exist in dependencies");

	if (!jobApplicationRepository) throw new Error("jobApplicationRepository should exist in dependencies"); 

	const execute = async (recruiterId: string) => {
		const [applied, shortlisted, rejected]: any =
			await Promise.all([
				jobApplicationRepository.numberOfAppliedStatusCount(recruiterId),
				jobApplicationRepository.numberOfShortlistedStatusCount(recruiterId),
				jobApplicationRepository.numberOfRejectedStatusCount(recruiterId),
			]);
			
		return { applied, shortlisted, rejected };
	};

	return { execute };
};
