import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        repositories: { jobRepository },
    } = dependencies;

    if (!jobRepository) {
        throw new Error('jobRepository should exist in dependencies');
    }

    const execute = async (page: number, limit: number) => {
        // pagination
        const skip = (page - 1) * limit;

        const jobs = await jobRepository.getAllJobs(skip, limit);
        const jobsCount = await jobRepository.getCountOfJobs();
        const numberOfPages = Math.ceil(jobsCount / limit);

        return { jobs, numberOfPages };
    };

    return { execute };
};
