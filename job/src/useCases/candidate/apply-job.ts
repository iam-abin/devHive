import { JobApplication, IJobApplication } from "../../entities/job-applications";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const { repositories: { jobApplicationRepository }} = dependencies;

	if (!jobApplicationRepository) throw new Error("jobApplicationRepository should exist in dependencies");
		
	const execute =(data: IJobApplication) => {
		
		const applicationData = new JobApplication(data)
		return jobApplicationRepository.applyJob(applicationData);
	};

	return { execute };
};
