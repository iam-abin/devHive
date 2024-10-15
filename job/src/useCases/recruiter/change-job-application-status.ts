import { ForbiddenError } from "@abijobportal/common";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
    const {
        repositories: { jobApplicationRepository },
    } = dependencies;

    if (!jobApplicationRepository) {
        throw new Error(
            "jobApplicationRepository should exist in dependencies"
        );
    }

    const execute = async (
        jobApplicationId: string,
        applicationStatus: string,
        recruiterId: string
    ) => {
		const jobApplication =  await jobApplicationRepository.getAJobApplication(jobApplicationId);

		if(recruiterId !== jobApplication.recruiterId.toString()){
			throw new ForbiddenError("You cannot modify others job")
		}

        const status =
            await jobApplicationRepository.changeJobApplicationStatus(
                jobApplicationId,
                applicationStatus
            );
        return status
    };

    return { execute };
};
