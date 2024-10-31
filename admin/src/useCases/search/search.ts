import { BadRequestError } from '@abijobportal/common';
import { IDependency } from '../../frameworks/types/dependency';

const SEARCH_RESOURCE_TYPES = Object.freeze({
    CANDIDATE: 'candidate',
    RECRUITER: 'recruiter',
    JOBS: 'jobs',
    PAYMENTS: 'payments',
    PLANS: 'palns',
});

export = (dependencies: IDependency) => {
    const {
        repositories: {
            recruiterRepository,
            candidateRepository,
            jobRepository,
            membershipRepository,
            paymentRepository,
        },
    } = dependencies;

    if (!recruiterRepository) {
        throw new Error('recruiterRepository should exist in dependencies');
    }

    const execute = async (resourceType: string, searchKey: string, page: number, limit: number) => {
        // pagination
        const skip = (page - 1) * limit;

        let result;
        let count: number = 0;
        switch (resourceType) {
            case SEARCH_RESOURCE_TYPES.CANDIDATE: {
                result = await candidateRepository.searchCandidates(searchKey, skip, limit);
                count = await candidateRepository.getCountOfSearchedCandidates(searchKey);
                break;
            }
            case SEARCH_RESOURCE_TYPES.RECRUITER: {
                result = await recruiterRepository.searchRecruiters(searchKey, skip, limit);
                count = await recruiterRepository.getCountOfSearchedRecruiters(searchKey);
                break;
            }
            case SEARCH_RESOURCE_TYPES.JOBS: {
                result = await jobRepository.searchJobs(searchKey, skip, limit);
                count = await jobRepository.getCountOfSearchedJobs(searchKey);
                break;
            }
            case SEARCH_RESOURCE_TYPES.PAYMENTS: {
                result = await paymentRepository.searchPayments(searchKey, skip, limit);
                count = await paymentRepository.getCountOfSearchedPayments(searchKey);
                break;
            }
            case SEARCH_RESOURCE_TYPES.PLANS: {
                result = await membershipRepository.searchMembershipPlans(searchKey, skip, limit);
                count = await membershipRepository.getCountOfSearchedMembershipPlans(searchKey);
                break;
            }

            default:
                throw new BadRequestError('Invalid resoutce type');
        }

        const numberOfPages = Math.ceil(count / limit);
        return { result, numberOfPages };
    };

    return { execute };
};
