
import { ForbiddenError } from "@abijobportal/common";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	const { repositories: { jobApplicationRepository } } = dependencies;

	if (!jobApplicationRepository) {
		throw new Error("jobApplicationRepository should exist in dependencies");
	}

	const execute = async (jobApplicationId: string, recruiterId: string) => {
		const jobApplication =  await jobApplicationRepository.getAJobApplication(jobApplicationId);

		if(recruiterId !== jobApplication.recruiterId.toString()){
			throw new ForbiddenError("You cannot access others added jobs application")
		}

		return jobApplicationRepository.getAJobApplicationByRecruiter(jobApplicationId);
	};

	return { execute };
};



