import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const {
		repositories: {
			candidateRepository,
			recruiterRepository,
			jobRepository,
			paymentRepository,
		},
	} = dependencies;

	if (!candidateRepository) throw new Error("candidateRepository should exist in dependencies");
		
	if (!recruiterRepository) throw new Error("recruiterRepository should exist in dependencies");
		
	if (!jobRepository) throw new Error("jobRepository should exist in dependencies");

	if (!paymentRepository) throw new Error("paymentRepository should exist in dependencies"); 

	const execute = async () => {
		const [candidateCount, recruiterCount, jobCount, totalRevenue]: any =
			await Promise.all([
				candidateRepository.numberOfCandidates(),
				recruiterRepository.numberOfRecruiters(),
				jobRepository.numberOfJobs(),
				paymentRepository.totalRevenue(),
			]);
			
		return { candidateCount, recruiterCount, jobCount, totalRevenue };
	};

	return { execute };
};
