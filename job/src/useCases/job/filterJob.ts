import { IDependency } from '../../frameworks/types/dependency';
import { IFilter } from '../../frameworks/types/job';

export = (dependencies: IDependency) => {
    const {
        repositories: { jobRepository },
    } = dependencies;

    if (!jobRepository) throw new Error('jobRepository should exist in dependencies');

    const execute = async (jobFilterData: IFilter, page: number, limit: number) => {
        // pagination
        const skip = (page - 1) * limit;

        const filterCriteria: Partial<IFilter> = {};

        Object.entries(jobFilterData).forEach(([key, value]) => {
            if (value !== '') {
                filterCriteria[key as keyof IFilter] = value;
            }
        });

        const jobs = await jobRepository.filterJobs(filterCriteria, skip, limit);
        const jobCount = await jobRepository.getCountOfFilterdJobs(filterCriteria);

        const numberOfPages = Math.ceil(jobCount / limit);
        return { jobs, numberOfPages };
    };

    return { execute };
};
