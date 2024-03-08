export = (dependencies: any) => {
	const {
		repositories: {
			candidateRepository,
			recruiterRepository,
			jobRepository,
			paymentRepository,
		},
	} = dependencies;

	if (!candidateRepository) {
		throw new Error("candidateRepository should exist in dependencies");
	}

	if (!recruiterRepository) {
		throw new Error("recruiterRepository should exist in dependencies");
	}

	if (!jobRepository) {
		throw new Error("jobRepository should exist in dependencies");
	}

	if (!paymentRepository) {
		throw new Error("paymentRepository should exist in dependencies");
	}

	const execute = async () => {
		const [candidateCount, recruiterCount, jobCount, totalRevenue]: any =
			await Promise.all([
				candidateRepository.numberOfCandidates(),
				recruiterRepository.numberOfRecruiters(),
				jobRepository.numberOfJobs(),
				paymentRepository.totalRevenue(),
			]);

            console.log("inside get all dashboard cars derails usecase ", { candidateCount, recruiterCount, jobCount, totalRevenue });
            

		return { candidateCount, recruiterCount, jobCount, totalRevenue };
	};

	return { execute };
};
