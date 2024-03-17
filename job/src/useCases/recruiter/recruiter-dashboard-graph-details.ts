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
		console.log("inside get all dashboard graph details useCase 1");
		
		const [candidateCount, recruiterCount, jobCount, totalRevenue]: any =
			await Promise.all([
				jobRepository.numberOfCreatedJobsByMe(recruiterId),
				jobApplicationRepository.numberOfJobApplicationsToMe(recruiterId),
				// jobRepository.numberOfJobs(),
			]);

            console.log("inside get all dashboard graph details useCase 2 ", { candidateCount, recruiterCount, jobCount, totalRevenue });
            

		return { candidateCount, recruiterCount, jobCount, totalRevenue };
	};

	return { execute };
};
