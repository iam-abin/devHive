import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        repositories: { candidateRepository, recruiterRepository, jobRepository, paymentRepository },
    } = dependencies;

    if (!candidateRepository) throw new Error('candidateRepository should exist in dependencies');

    if (!recruiterRepository) throw new Error('recruiterRepository should exist in dependencies');

    if (!jobRepository) throw new Error('jobRepository should exist in dependencies');

    if (!paymentRepository) throw new Error('paymentRepository should exist in dependencies');

    const execute = async () => {
        const [candidateCount, recruiterCount, jobCount, totalRevenue]: number[] = await Promise.all([
            candidateRepository.getCountOfCandidates(),
            recruiterRepository.getCountOfRecruiters(),
            jobRepository.getCountOfJobs(),
            paymentRepository.totalRevenue(),
        ]);

        return { candidateCount, recruiterCount, jobCount, totalRevenue };
    };

    return { execute };
};
