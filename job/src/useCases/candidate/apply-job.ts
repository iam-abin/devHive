import { JobApplication, jobApplicationInterface } from "../../entities/job-applications";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const { repositories: { jobApplicationRepository }} = dependencies;

	if (!jobApplicationRepository) {
		throw new Error("jobApplicationRepository should exist in dependencies");
	}

	const execute =(data: jobApplicationInterface) => {
        // console.log("in applyjob usecase",data);

		const applicationData = new JobApplication(data)
		return jobApplicationRepository.applyJob(applicationData);
	};

	return { execute };
};
