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


	const execute = async () => {
		console.log("inside get all dashboard card details useCase 1");
		
		const [candidateCount, recruiterCount, jobCount, totalRevenue]: any =
			await Promise.all([
				jobRepository.numberOfCreatedJobsByMe(),
				jobApplicationRepository.numberOfJobApplicationsToMe(),
				// jobRepository.numberOfJobs(),
			]);

            console.log("inside get all dashboard card details useCase 2 ", { candidateCount, recruiterCount, jobCount, totalRevenue });
            

		return { candidateCount, recruiterCount, jobCount, totalRevenue };
	};

	return { execute };
};
