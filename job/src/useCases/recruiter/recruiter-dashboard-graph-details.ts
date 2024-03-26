export = (dependencies: any) => {
	const {
		repositories: {
			jobRepository,
			jobApplicationRepository,
		},
	} = dependencies;

	if (!jobRepository) {
		throw new Error("jobRepository should exist in dependencies");
	}

	if (!jobApplicationRepository) {
		throw new Error("jobApplicationRepository should exist in dependencies");
	}


	const execute = async (recruiterId: string) => {
		console.log("inside get all dashboard graph details useCase 111");
		
		const [applied, shortlisted, rejected]: any =
		// await jobApplicationRepository.jobApplicationsStatuses(recruiterId)
			await Promise.all([
				jobApplicationRepository.numberOfAppliedStatusCount(recruiterId),
				jobApplicationRepository.numberOfShortlistedStatusCount(recruiterId),
				jobApplicationRepository.numberOfRejectedStatusCount(recruiterId),
			]);

            console.log("inside get all dashboard graph details useCase 2 ", {applied, shortlisted, rejected });
            

		return { applied, shortlisted, rejected };
	};

	return { execute };
};
