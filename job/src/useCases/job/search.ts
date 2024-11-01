import { BadRequestError } from '@abijobportal/common';
import { IDependency } from '../../frameworks/types/dependency';

const SEARCH_RESOURCE_TYPES = Object.freeze({
    APPLIED_JOBS: 'applied-jobs',
    JOBS: 'jobs',
});

export = (dependencies: IDependency) => {
    const {
        repositories: { jobRepository, jobApplicationRepository },
    } = dependencies;
    
    const execute = async (resourceType: string, searchKey: string, page: number, limit: number) => {
        // pagination
        const skip = (page - 1) * limit;

        let jobs;
        let count: number = 0;

        switch (resourceType) {
            case SEARCH_RESOURCE_TYPES.JOBS: {
                jobs = await jobRepository.searchJob(searchKey.trim(), skip, limit);
                count = await jobRepository.searchJobCount(searchKey);
                
                break;
            }
            
            case SEARCH_RESOURCE_TYPES.APPLIED_JOBS: {
                jobs = await jobApplicationRepository.searchAppliedJobs(searchKey.trim(), skip, limit);
                count = await jobApplicationRepository.searchAppliedJobsCount(searchKey);
                console.log("adf",jobs);
                
                break;
            }

            default:
                throw new BadRequestError('Invalid resoutce type');
        }

        // It is used to get the total number of pages
        const numberOfPages = Math.ceil(count / limit);
        return { jobs, numberOfPages };
    };

    return { execute };
};
