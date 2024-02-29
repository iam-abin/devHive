export = (dependencies: any) => {
	const {
		repositories: {
			candidateRepository,
			recruiterRepository,
			jobRepository,
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

	const execute = async () => {
		// const [candidatesCount, recruitersCount, jobsCount, totalRevenue] = await Promise.all([
		//     Candidate.countDocuments(),
		//     Recruiter.countDocuments(),
		//     Job.countDocuments(),
		//     Price.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]),
		//   ]);

		const [candidateCount, recruiterCount, jobCount]: any =
			await Promise.all([
				candidateRepository.numberOfCandidates(),
				recruiterRepository.numberOfRecruiters(),
				jobRepository.numberOfJobs(),
			]);

            console.log("inside get all dashboard cars derails usecase ", { candidateCount, recruiterCount, jobCount });
            

		return { candidateCount, recruiterCount, jobCount };
	};

	return { execute };
};
