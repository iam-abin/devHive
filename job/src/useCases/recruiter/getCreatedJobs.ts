import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        repositories: { jobRepository },
    } = dependencies;

    if (!jobRepository) {
        throw new Error('jobRepository should exist in dependencies');
    }

    const execute = async (recruiterId: string, page: number, limit: number) => {
        // pagination
        const skip = (page - 1) * limit;

        const jobs = await jobRepository.getAllJobsByRecruiterId(recruiterId, skip, limit);
        const jobsCount = await jobRepository.getCountOfCreatedJobs(recruiterId);
        const numberOfPages = Math.ceil(jobsCount / limit);

        return { jobs, numberOfPages };
    };

    return { execute };
};
