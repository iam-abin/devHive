import { BadRequestError, ForbiddenError, NotFoundError } from "@abijobportal/common";
import { IDependency } from "../../frameworks/types/dependencyInterface";

type application = {
    jobApplicationId: string;
    recruiterId: string;
    candidateId: string;
};

export = (dependencies: IDependency) => {
    const {
        repositories: { jobRepository, jobApplicationRepository },
    } = dependencies;

    if (!jobRepository) {
        throw new Error(
            "jobRepository should exist in dependencies"
        );
    }
    if (!jobApplicationRepository) {
        throw new Error(
            "jobApplicationRepository should exist in dependencies"
        );
    }

    const execute = async ({
        jobApplicationId,
        recruiterId,
        candidateId,
    }: application) => {

		
		const jobApplication = await jobApplicationRepository.getAJobApplication(jobApplicationId);
		if(!jobApplication) throw new NotFoundError("Job application not found")
		
        if (!recruiterId && !candidateId){
			throw new BadRequestError(
				"Should provide either candidateId or recruiterId"
			);
		}
        const job = await jobRepository.getAJob(jobApplication.jobId);
		if(!job) throw new NotFoundError("job not found")

        // If current user is recruiter
        if (recruiterId) {
			if (recruiterId !== jobApplication.recruiterId.toString()) {
				throw new ForbiddenError(
					"You cannot access others added jobs application"
                );
            }
        }
		
		// If current user is candidate
        if (candidateId) {
			if (candidateId !== jobApplication.candidateId.toString()) {
                throw new ForbiddenError(
                    "You cannot access others application"
                );
            }
        }

        return jobApplication;
    };

    return { execute };
};
