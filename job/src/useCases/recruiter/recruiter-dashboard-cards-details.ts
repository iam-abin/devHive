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
		console.log("inside get all dashboard card details useCase 1");
		
		const [addedJobsCount, jobApplicationsCount]: any =
			await Promise.all([
				jobRepository.numberOfCreatedJobsByMe(recruiterId),
				jobApplicationRepository.numberOfJobApplicationsToMe(recruiterId),
				// jobRepository.numberOfJobs(),
			]);

            console.log("inside get all dashboard card details useCase 2 c", { addedJobsCount, jobApplicationsCount });
            

		return { addedJobsCount, jobApplicationsCount };
	};

	return { execute };
};
