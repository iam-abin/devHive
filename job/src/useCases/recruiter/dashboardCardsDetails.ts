import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        repositories: { jobRepository, jobApplicationRepository },
    } = dependencies;

    if (!jobRepository) throw new Error('jobRepository should exist in dependencies');
    if (!jobApplicationRepository) throw new Error('jobApplicationRepository should exist in dependencies');

    const execute = async (recruiterId: string) => {
        const [addedJobsCount, jobApplicationsCount]: [number, number] = await Promise.all([
            jobRepository.getCountOfCreatedJobs(recruiterId),
            jobApplicationRepository.getCountOfApplications(recruiterId),
        ]);

        return { addedJobsCount, jobApplicationsCount };
    };

    return { execute };
};
