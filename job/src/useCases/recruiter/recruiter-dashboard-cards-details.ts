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
		
		const [addedJobsCount, jobApplicationsCount]: any =
			await Promise.all([
				jobRepository.numberOfCreatedJobsByMe(recruiterId),
				jobApplicationRepository.numberOfJobApplicationsToMe(recruiterId),
			]);
			
		return { addedJobsCount, jobApplicationsCount };
	};

	return { execute };
};
