import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		repositories: { jobApplicationRepository },
	} = dependencies;

	if (!jobApplicationRepository) {
		throw new Error("jobApplicationRepository should exist in dependencies");
	}

	const execute =(data: object) => {
        console.log(data);
        
		return jobApplicationRepository.applyJob(data);
	};

	return { execute };
};
