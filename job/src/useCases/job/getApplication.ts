import { BadRequestError, ForbiddenError, NotFoundError } from "@abijobportal/common";
import { IDependency } from "../../frameworks/types/dependencyInterface";

type application = {
    jobApplicationId: string;
    recruiterId: string;
    candidateId: string;
};

export = (dependencies: IDependency) => {
    const {
        repositories: { jobApplicationRepository },
    } = dependencies;

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

		
		const jobApplication =
		await jobApplicationRepository.getAJobApplication(jobApplicationId);
		if(!jobApplication) throw new NotFoundError("Job application not found")
		
        if (!recruiterId && !candidateId){
			console.log("jj");
			
			throw new BadRequestError(
				"Should provide either candidateId or recruiterId"
			);
		}
           

		
		console.log(jobApplication);
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
